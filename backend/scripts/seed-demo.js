import 'dotenv/config'
import argon2 from 'argon2'
import { pool } from '../src/config/database.js'

async function seedDemo() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // 1. Ensure default workspace exists
    const wsRes = await client.query(
      `INSERT INTO institutions (name, code, country, timezone)
       VALUES ('Okoa Sem Default Workspace', 'OKOA-DEFAULT', 'Kenya', 'Africa/Nairobi')
       ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
    )
    const workspaceId = wsRes.rows[0].id

    // 2. Seed Demo Accounts (Password: Password123)
    const passwordHash = await argon2.hash('Password123', { type: argon2.argon2id })

    const demoUsers = [
      { email: 'student@okoa.ac.ke', fullName: 'Alex Rivera (Student)', role: 'student' },
      { email: 'rep@okoa.ac.ke', fullName: 'Faith Wanjiku (Class Rep)', role: 'class_rep' },
      { email: 'lecturer@okoa.ac.ke', fullName: 'Dr. Julian Vance (Lecturer)', role: 'lecturer' },
    ]

    const userMap = {}
    for (const u of demoUsers) {
      const userRes = await client.query(
        `INSERT INTO users (institution_id, email, full_name, role, password_hash, account_status, email_verified)
         VALUES ($1, $2, $3, $4, $5, 'active', TRUE)
         ON CONFLICT (email) DO UPDATE
           SET full_name = EXCLUDED.full_name,
               role = EXCLUDED.role,
               password_hash = EXCLUDED.password_hash,
               account_status = 'active'
         RETURNING id`,
        [workspaceId, u.email, u.fullName, u.role, passwordHash],
      )
      const userId = userRes.rows[0].id
      userMap[u.role] = userId

      await client.query(
        `INSERT INTO workspace_memberships (user_id, workspace_id, role, status)
         VALUES ($1, $2, $3, 'active')
         ON CONFLICT (user_id, workspace_id) DO UPDATE SET role = EXCLUDED.role, status = 'active'`,
        [userId, workspaceId, u.role],
      )
    }

    // 3. Seed Courses
    const demoCourses = [
      { code: 'SMA 2104', name: 'Mathematics for Science' },
      { code: 'ICS 2201', name: 'Object-Oriented Programming II' },
      { code: 'SMA 2101', name: 'Calculus I' },
      { code: 'STA 2100', name: 'Probability and Statistics I' },
    ]

    const courseMap = {}
    for (const c of demoCourses) {
      const courseRes = await client.query(
        `INSERT INTO courses (institution_id, code, name)
         VALUES ($1, $2, $3)
         ON CONFLICT (institution_id, code) DO UPDATE SET name = EXCLUDED.name
         RETURNING id`,
        [workspaceId, c.code, c.name],
      )
      const courseId = courseRes.rows[0].id
      courseMap[c.code] = courseId

      // Enrol student and create memberships for class_rep and lecturer
      await client.query(
        `INSERT INTO course_enrolments (user_id, course_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, course_id) DO NOTHING`,
        [userMap.student, courseId],
      )
      for (const role of ['student', 'class_rep', 'lecturer']) {
        await client.query(
          `INSERT INTO course_memberships (user_id, course_id, role, status)
           VALUES ($1, $2, $3, 'active')
           ON CONFLICT (user_id, course_id) DO UPDATE SET role = EXCLUDED.role, status = 'active'`,
          [userMap[role], courseId, role],
        )
      }
    }

    // 4. Seed initial pending extracted claims if none exist
    const existingClaims = await client.query(`SELECT COUNT(*)::int AS count FROM extracted_claims`)
    if (existingClaims.rows[0].count === 0) {
      const srcRes = await client.query(
        `INSERT INTO sources (workspace_id, course_id, submitted_by, source_type, status, metadata)
         VALUES ($1, $2, $3, 'whatsapp_export', 'completed', $4::jsonb)
         RETURNING id`,
        [
          workspaceId,
          courseMap['ICS 2201'],
          userMap.class_rep,
          JSON.stringify({
            channel: 'WhatsApp Class Group',
            text: 'Morning team, Dr. Kamau mentioned ICS 2201 CAT 1 is moving to Friday 15th Nov at 11am in Hall B.',
          }),
        ],
      )
      const sourceId = srcRes.rows[0].id

      await client.query(
        `INSERT INTO extracted_claims
           (source_id, claim_type, title, description, course_id, course_hint, start_at, venue, confidence, evidence_snippet, status)
         VALUES
           ($1, 'cat', 'ICS 2201 CAT 1 Rescheduled to Friday 11:00 AM',
            'Extracted from WhatsApp message forwarded by Class Rep. Needs lecturer confirmation before updating course schedule.',
            $2, 'ICS 2201', now() + interval '3 days', 'Hall B', 0.91,
            'Morning team, Dr. Kamau mentioned ICS 2201 CAT 1 is moving to Friday 15th Nov at 11am in Hall B.',
            'pending'),
           ($1, 'venue_change', 'SMA 2104 Thursday Tutorial Venue Moved to Room 204',
            'Forwarded notice from department board indicating Room 102 is under maintenance.',
            $3, 'SMA 2104', now() + interval '2 days', 'Room 204', 0.87,
            'Notice: SMA 2104 tutorial this Thursday will be held in Room 204 instead of Room 102.',
            'pending')`,
        [sourceId, courseMap['ICS 2201'], courseMap['SMA 2104']],
      )
    }

    await client.query('COMMIT')
    console.log('Seeded demo workspace, accounts (student/rep/lecturer@okoa.ac.ke), courses, and initial claims.')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Demo seed failed:', err.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

seedDemo()

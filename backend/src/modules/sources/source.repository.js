import { pool } from '../../config/database.js'

export async function createSource({ workspaceId, courseId = null, submittedBy, sourceType, metadata = {} }) {
  const { rows } = await pool.query(
    `INSERT INTO sources (workspace_id, course_id, submitted_by, source_type, metadata)
     VALUES ($1, $2, $3, $4, $5::jsonb)
     RETURNING id, workspace_id, course_id, submitted_by, source_type, status, metadata, created_at, updated_at`,
    [workspaceId, courseId, submittedBy, sourceType, JSON.stringify(metadata)],
  )
  return rows[0]
}

export async function getSourceById(id) {
  const { rows } = await pool.query(
    `SELECT id, workspace_id, course_id, submitted_by, source_type, status, metadata, created_at, updated_at
       FROM sources WHERE id = $1`,
    [id],
  )
  return rows[0] ?? null
}

export async function updateSourceStatus(id, status) {
  const { rows } = await pool.query(
    `UPDATE sources SET status = $2, updated_at = now() WHERE id = $1
     RETURNING id, status, updated_at`,
    [id, status],
  )
  return rows[0] ?? null
}

export async function createSourceDocument(input) {
  const { rows } = await pool.query(
    `INSERT INTO source_documents
       (source_id, public_id, resource_type, format, bytes, mime_type, checksum, extracted_text, text_extraction_status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, source_id, public_id, resource_type, format, bytes, mime_type, checksum, extracted_text, text_extraction_status, created_at`,
    [
      input.sourceId,
      input.publicId,
      input.resourceType ?? null,
      input.format ?? null,
      input.bytes ?? null,
      input.mimeType ?? null,
      input.checksum ?? null,
      input.extractedText ?? null,
      input.textExtractionStatus ?? 'pending',
    ],
  )
  return rows[0]
}

export async function getSourceDocument(id) {
  const { rows } = await pool.query(`SELECT * FROM source_documents WHERE id = $1`, [id])
  return rows[0] ?? null
}

export async function updateSourceDocumentText(id, extractedText, status) {
  const { rows } = await pool.query(
    `UPDATE source_documents SET extracted_text = $2, text_extraction_status = $3 WHERE id = $1
     RETURNING id, text_extraction_status`,
    [id, extractedText, status],
  )
  return rows[0] ?? null
}

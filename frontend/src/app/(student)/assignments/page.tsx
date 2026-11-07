import { PageHeader } from '@/components/student/PageHeader'
import { AssignmentsWorkspace } from '@/features/student/AssignmentsWorkspace'

export const metadata = { title: 'Assignments' }

export default function AssignmentsPage() {
  return <div>
    <PageHeader eyebrow="YOUR WORK, ALL TOGETHER" title="Assignments" description="Deadlines and progress across your current courses." />
    <div className="demo-notice"><span className="demo-pulse" />Demo workspace <span>Submission actions update this preview only; nothing is uploaded.</span></div>
    <AssignmentsWorkspace />
  </div>
}

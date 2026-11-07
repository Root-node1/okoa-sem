import { PageHeader } from '@/components/student/PageHeader'
import { CalendarWorkspace } from '@/features/student/CalendarWorkspace'

export const metadata = { title: 'Calendar' }

export default function CalendarPage() {
  return <div>
    <PageHeader eyebrow="YOUR SEMESTER AT A GLANCE" title="Calendar" description="A clear view of what's coming up across your enrolled courses." />
    <div className="demo-notice"><span className="demo-pulse" />Demo workspace <span>Only verified events are shown on this calendar.</span></div>
    <CalendarWorkspace />
  </div>
}

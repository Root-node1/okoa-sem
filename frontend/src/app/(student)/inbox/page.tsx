import { PageHeader } from '@/components/student/PageHeader'
import { InboxWorkspace } from '@/features/student/InboxWorkspace'

export const metadata = { title: 'Inbox' }

export default function InboxPage() {
  return <div>
    <PageHeader eyebrow="YOUR ACADEMIC INBOX" title="A little more in the loop." description="Updates, notifications, and information you've shared with your courses." />
    <div className="demo-notice"><span className="demo-pulse" />Demo workspace <span>Submissions and read states are held in this browser session only.</span></div>
    <InboxWorkspace />
  </div>
}

import { PageHeader } from '@/components/student/PageHeader'
import { AssistantChat } from '@/features/student/AssistantChat'

export const metadata = { title: 'Academic assistant' }

export default function AssistantPage() {
  return <div>
    <PageHeader eyebrow="YOUR ACADEMIC COMPANION" title="Ask Okoa" description="Get grounded answers from confirmed information in your courses." />
    <div className="demo-notice"><span className="demo-pulse" />Demo workspace <span>Assistant replies are examples, not generated or connected to your records.</span></div>
    <AssistantChat />
  </div>
}

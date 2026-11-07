import { PageHeader } from '@/components/student/PageHeader'
import { SettingsForm } from '@/features/student/SettingsForm'

export const metadata = { title: 'Settings' }

export default function SettingsPage() {
  return <div>
    <PageHeader eyebrow="MAKE IT YOURS" title="Settings" description="A few small things to help Okoa fit your routine." />
    <div className="demo-notice"><span className="demo-pulse" />Demo workspace <span>Your preferences are preview-only and are not saved to an account.</span></div>
    <SettingsForm />
  </div>
}

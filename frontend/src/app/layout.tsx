import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Okoa Sem | Student workspace',
    template: '%s | Okoa Sem',
  },
  description: 'Your academic schedule, course updates, and deadlines in one place.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

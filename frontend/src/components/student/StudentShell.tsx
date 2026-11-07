'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'

const navigation = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { label: 'Courses', href: '/courses', icon: 'book' },
  { label: 'Inbox', href: '/inbox', icon: 'inbox', count: '3' },
  { label: 'Calendar', href: '/calendar', icon: 'calendar' },
  { label: 'Assignments', href: '/assignments', icon: 'assignment' },
  { label: 'Assistant', href: '/assistant', icon: 'spark' },
] as const

export function StudentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = navigation.map((item) => {
    const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}/`))
    return (
      <Link
        aria-current={active ? 'page' : undefined}
        className={`nav-link${active ? ' nav-link-active' : ''}`}
        href={item.href}
        key={item.href}
        onClick={() => setMobileOpen(false)}
      >
        <Icon className="nav-icon" name={item.icon} />
        <span>{item.label}</span>
        {'count' in item && <span className="nav-count">{item.count}</span>}
      </Link>
    )
  })

  return (
    <div className="app-shell">
      <aside className={`sidebar${mobileOpen ? ' sidebar-open' : ''}`}>
        <Link aria-label="Okoa Sem home" className="brand" href="/dashboard">
          <span className="brand-mark">o</span>
          <span className="brand-copy"><strong>okoa<span>.</span></strong><small>STUDENT SPACE</small></span>
        </Link>
        <div className="workspace-label">WORKSPACE</div>
        <nav aria-label="Main navigation" className="primary-nav">{links}</nav>
        <div className="sidebar-bottom">
          <div className="term-card">
            <div className="term-icon"><Icon name="sun" /></div>
            <span className="term-overline">CURRENT TERM</span>
            <strong>Semester II</strong>
            <span className="term-meta">2026 / 2027</span>
            <div className="term-progress"><span /></div>
            <span className="term-meta">Week 8 of 14</span>
          </div>
          <Link className="nav-link" href="/settings">
            <Icon className="nav-icon" name="settings" /><span>Settings</span>
          </Link>
          <div className="profile-mini">
            <div className="avatar">AM</div>
            <div className="profile-copy"><strong>Amara Mwangi</strong><span>Student</span></div>
            <Link aria-label="Open account settings" className="icon-button profile-more" href="/settings"><Icon name="settings" /></Link>
          </div>
        </div>
      </aside>

      {mobileOpen && <button aria-label="Close navigation" className="mobile-backdrop" onClick={() => setMobileOpen(false)} />}
      <div className="main-column">
        <header className="topbar">
          <button aria-label="Open navigation" className="icon-button mobile-menu" onClick={() => setMobileOpen(true)}>
            <Icon name="menu" />
          </button>
          <div className="breadcrumb"><span>Student space</span><Icon name="chevron" /><strong>{getPageName(pathname)}</strong></div>
          <div className="topbar-actions">
            <Link aria-label="Open inbox, 3 unread" className="icon-button notification-button" href="/inbox">
              <Icon name="bell" /><span className="notification-dot" />
            </Link>
            <div className="topbar-avatar" title="Amara Mwangi">AM</div>
          </div>
        </header>
        <main className="page-content">{children}</main>
        <footer className="app-footer"><span>Made for the moments between lectures.</span><span>Okoa Sem <b>·</b> Demo workspace</span></footer>
      </div>
      <nav aria-label="Mobile navigation" className="mobile-tabs">
        {navigation.slice(0, 4).map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}/`))
          return <Link aria-current={active ? 'page' : undefined} className={active ? 'mobile-tab active' : 'mobile-tab'} href={item.href} key={item.href}>
            <Icon name={item.icon} /><span>{item.label}</span>
          </Link>
        })}
        <Link className="mobile-tab" href="/settings"><Icon name="menu" /><span>More</span></Link>
      </nav>
    </div>
  )
}

function getPageName(pathname: string) {
  if (pathname.startsWith('/courses/')) return 'Course workspace'
  const page = navigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
  if (page) return page.label
  return pathname.slice(1).replace(/^./, (letter) => letter.toUpperCase()) || 'Dashboard'
}

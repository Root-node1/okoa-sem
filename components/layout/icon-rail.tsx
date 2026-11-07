"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  CalendarDays,
  MessageSquare,
  Settings,
  Flame,
  ArrowUpRight,
} from "lucide-react";

export function IconRail() {
  const pathname = usePathname();

  const navItems = [
    { href: "/units/sma-2104", icon: BookOpen, label: "Units & Courses" },
    { href: "/reviews", icon: CheckCircle2, label: "Triage & Grading" },
    { href: "/consultations", icon: CalendarDays, label: "Office Hours" },
    { href: "/threads", icon: MessageSquare, label: "Discussions" },
  ];

  return (
    <aside className="w-16 h-full flex-shrink-0 bg-surface-1 border-r border-border-subtle flex flex-col items-center justify-between py-3.5 z-30 select-none">
      {/* Top Identity & Primary Nav */}
      <div className="flex flex-col items-center gap-5 w-full">
        {/* Brand Crest */}
        <Link
          href="/"
          className="h-10 w-10 rounded-lg bg-surface-2 border border-border-strong flex items-center justify-center font-serif-display font-semibold text-lg text-txt-main hover:bg-surface-3 transition-colors"
          title="MCS Portal"
        >
          N
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5 w-full px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`relative h-11 w-full rounded-md flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-surface-2 text-txt-main font-medium border border-border-strong"
                    : "text-txt-muted hover:text-txt-main hover:bg-surface-2"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.7} />
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-txt-main rounded-r" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Shortcuts */}
      <div className="flex flex-col items-center gap-2.5 w-full px-2">
        <button
          title="Active Semester Sprint"
          className="h-9 w-9 rounded-md flex items-center justify-center text-amber hover:bg-surface-2 transition-colors"
        >
          <Flame size={16} />
        </button>

        <button
          title="Settings"
          className="h-9 w-9 rounded-md flex items-center justify-center text-txt-muted hover:text-txt-main hover:bg-surface-2 transition-colors"
        >
          <Settings size={16} />
        </button>

        <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-strong flex items-center justify-center text-[11px] font-mono-code font-medium text-txt-main cursor-pointer hover:border-txt-main transition-colors mt-1">
          RC
        </div>
      </div>
    </aside>
  );
}

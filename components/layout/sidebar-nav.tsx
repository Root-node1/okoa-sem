"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { MOCK_UNITS } from "@/data/mock-units";
import { useAuthRole } from "@/hooks/use-auth-role";
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  CalendarDays,
  CheckSquare,
  Sparkles,
  Clock,
  FileCheck2,
  Hash,
  Compass,
  ArrowRightLeft,
  GraduationCap,
  Briefcase,
  Settings,
} from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();
  const params = useParams();
  const currentUnitId = params.unitId as string;
  const { role, user, toggleRole, isStudent } = useAuthRole();

  return (
    <div className="flex flex-col h-full bg-surface-1 select-none">
      {/* Workspace Header & Context */}
      <div className="h-14 px-3.5 border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <div className="w-7 h-7 rounded-md bg-surface-2 border border-border-strong flex items-center justify-center text-xs font-mono-code font-bold text-txt-main">
            {isStudent ? "ST" : "FC"}
          </div>
          <div className="truncate">
            <h2 className="text-xs font-semibold tracking-tight text-txt-main truncate leading-tight">
              {isStudent ? "Mathematics & CS Hub" : "Dept. of Applied Maths"}
            </h2>
            <p className="text-[10px] font-mono-code text-txt-muted truncate">
              {isStudent ? "Year 1 • Semester 2" : "Faculty Teaching Portal"}
            </p>
          </div>
        </div>

        {/* Role Toggle Button */}
        <button
          onClick={toggleRole}
          title={`Currently in ${role} mode. Click to switch.`}
          className="h-6 px-1.5 rounded text-[10px] font-mono-code font-medium bg-surface-2 hover:bg-surface-3 text-txt-sub border border-border-subtle flex items-center gap-1 transition-colors"
        >
          <ArrowRightLeft size={10} />
          <span className="capitalize">
            {role === "STUDENT" ? "Student" : "Lecturer"}
          </span>
        </button>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
        {/* Primary Role-Aware Navigation */}
        <div>
          <div className="px-2 mb-1.5">
            <span className="text-[10px] font-mono-code font-semibold uppercase tracking-wider text-txt-muted">
              {isStudent ? "Academic Workspace" : "Faculty Coordination"}
            </span>
          </div>
          <div className="space-y-0.5">
            {/* Overview / Dashboard */}
            <Link
              href="/"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname === "/"
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard
                  size={14}
                  className={
                    pathname === "/" ? "text-txt-main" : "text-txt-muted"
                  }
                />
                <span>
                  {isStudent ? "Academic Overview" : "Teaching Overview"}
                </span>
              </div>
            </Link>

            {/* Academic Inbox & Claim Verification */}
            <Link
              href="/inbox"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname.startsWith("/inbox")
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <Inbox size={14} className="text-amber" />
                <span>
                  {isStudent ? "Academic Inbox" : "Claim Verification"}
                </span>
              </div>
              <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-surface text-amber">
                {isStudent ? "3 new" : "2 pending"}
              </span>
            </Link>

            {/* Courses / Modules */}
            <Link
              href="/units"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname === "/units"
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-txt-muted" />
                <span>{isStudent ? "My Courses" : "Managed Units"}</span>
              </div>
              <span className="font-mono-code text-[10px] text-txt-muted">
                4
              </span>
            </Link>

            {/* Calendar */}
            <Link
              href="/calendar"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname.startsWith("/calendar")
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-emerald" />
                <span>Academic Calendar</span>
              </div>
            </Link>

            {/* Assignments & Tasks */}
            <Link
              href="/tasks"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname.startsWith("/tasks")
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckSquare size={14} className="text-indigo" />
                <span>{isStudent ? "My Tasks & Deadlines" : "Assignments"}</span>
              </div>
              <span className="font-mono-code text-[10px] text-txt-muted">
                3 due
              </span>
            </Link>

            {/* Lecturer Review / Submissions Triage */}
            <Link
              href="/reviews"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname.startsWith("/reviews")
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCheck2 size={14} className="text-txt-muted" />
                <span>
                  {isStudent ? "Submission Reviews" : "Submissions Triage"}
                </span>
              </div>
              {!isStudent && (
                <span className="font-mono-code text-[10px] font-semibold text-txt-sub">
                  13
                </span>
              )}
            </Link>

            {/* AI Assistant */}
            <Link
              href="/assistant"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname.startsWith("/assistant")
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber" />
                <span>Course Assistant</span>
              </div>
            </Link>

            {/* Office Hours / Consultations */}
            <Link
              href="/consultations"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname.startsWith("/consultations")
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-txt-muted" />
                <span>Office Hours</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
            </Link>
          </div>
        </div>

        {/* Enrolled Courses / Units */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1.5">
            <span className="text-[10px] font-mono-code font-semibold uppercase tracking-wider text-txt-muted">
              {isStudent ? "Active Semester Units" : "Current Teaching Units"}
            </span>
          </div>

          <div className="space-y-0.5">
            {MOCK_UNITS.map((unit) => {
              const isSelected = currentUnitId === unit.id;

              return (
                <Link
                  key={unit.id}
                  href={`/units/${unit.id}`}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors group ${
                    isSelected
                      ? "bg-surface-2 text-txt-main font-semibold border border-border-subtle"
                      : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Hash
                      size={13}
                      className={
                        isSelected
                          ? "text-txt-main"
                          : "text-txt-muted group-hover:text-txt-sub"
                      }
                    />
                    <span className="truncate">{unit.code}</span>
                  </div>

                  {unit.unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full font-mono-code text-[10px] bg-surface-3 text-txt-main">
                      {unit.unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Institutional Resources & Settings */}
        <div>
          <div className="px-2 mb-1.5">
            <span className="text-[10px] font-mono-code font-semibold uppercase tracking-wider text-txt-muted">
              Account & Hub
            </span>
          </div>
          <div className="space-y-0.5">
            <Link
              href="/settings"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname.startsWith("/settings")
                  ? "bg-surface-2 text-txt-main border border-border-subtle"
                  : "text-txt-sub hover:text-txt-main hover:bg-surface-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings size={14} className="text-txt-muted" />
                <span>Preferences & Settings</span>
              </div>
            </Link>

            <a
              href="https://mcs-all.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-txt-sub hover:text-txt-main hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-txt-muted" />
                <span>MCS Syllabus Repository</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom User Card & Role Switcher */}
      <div className="p-2.5 border-t border-border-subtle bg-surface-2/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <div className="w-7 h-7 rounded-full bg-surface-3 border border-border-strong flex items-center justify-center text-[10px] font-mono-code font-semibold text-txt-main shrink-0">
              {isStudent ? (
                <GraduationCap size={13} className="text-txt-main" />
              ) : (
                <Briefcase size={13} className="text-txt-main" />
              )}
            </div>
            <div className="truncate">
              <span className="block text-xs font-semibold text-txt-main truncate leading-tight">
                {user.name}
              </span>
              <span className="block font-mono-code text-[10px] text-txt-muted truncate">
                {user.identifier}
              </span>
            </div>
          </div>

          <button
            onClick={toggleRole}
            title="Switch active role"
            className="p-1 rounded text-txt-muted hover:text-txt-main hover:bg-surface-3 transition-colors"
          >
            <ArrowRightLeft size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

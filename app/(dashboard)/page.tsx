"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthRole } from "@/hooks/use-auth-role";
import { backendApi } from "@/lib/api/client";
import type { BackendAcademicEvent } from "@/types/api";
import { MOCK_UNITS } from "@/data/mock-units";
import {
  CalendarDays,
  Clock,
  FileText,
  ChevronRight,
  BookOpen,
  ArrowRightLeft,
  Sparkles,
  Inbox,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { user, toggleRole, isStudent } = useAuthRole();
  const [liveEvents, setLiveEvents] = useState<BackendAcademicEvent[]>([]);

  useEffect(() => {
    let active = true;
    backendApi
      .listEvents()
      .then((events) => {
        if (active && events.length > 0) {
          setLiveEvents(events.slice(0, 3));
        }
      })
      .catch(() => {
        // Hybrid fallback when backend is offline
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-1 select-none overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-sm font-semibold text-txt-main">
              {isStudent ? "Academic Command Centre" : "Faculty Teaching Overview"}
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              {user.programme || user.department} • {user.academicYear}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleRole}
            className="h-7 px-2.5 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle flex items-center gap-1.5 transition-colors"
          >
            <ArrowRightLeft size={12} className="text-amber" />
            <span>Switch to {isStudent ? "Lecturer View" : "Student View"}</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Canvas */}
      <div className="flex-1 overflow-y-auto p-6 bg-canvas/30">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Section 1: Academic Briefing (Mandated by PROJECT.md 6.1) */}
          <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-amber-surface border border-amber/20 flex items-center justify-center text-amber shrink-0 mt-0.5 sm:mt-0">
                <Sparkles size={16} />
              </div>
              <div>
                <span className="text-[10px] font-mono-code font-semibold uppercase tracking-wider text-amber block">
                  {isStudent ? "Daily Academic Briefing" : "Teaching Operations Status"}
                </span>
                <p className="text-xs text-txt-main leading-relaxed mt-0.5">
                  {isStudent
                    ? "You have 1 assignment due tomorrow, a Linear Algebra CAT scheduled for next Tuesday, and 1 timetable venue change awaiting confirmation."
                    : "You have 13 submissions awaiting evaluation in SMA 2104, 2 flagged mathematical doubts from students, and upcoming office hours today at 2:00 PM."}
                </p>
              </div>
            </div>

            <Link
              href={isStudent ? "/inbox" : "/reviews"}
              className="h-7 px-3 rounded text-xs font-medium bg-txt-main text-canvas flex items-center gap-1.5 hover:opacity-90 shrink-0 transition-opacity"
            >
              <span>{isStudent ? "Open Academic Inbox" : "Triage Submissions"}</span>
              <ChevronRight size={13} />
            </Link>
          </div>

          {/* Section 2: Two-Column Academic Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Schedule & Authoritative Announcements */}
            <div className="lg:col-span-7 space-y-6">
              {/* Today's Schedule */}
              <div className="rounded-lg bg-surface-1 border border-border-subtle overflow-hidden">
                <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} className="text-txt-muted" />
                    <h2 className="text-xs font-semibold text-txt-main">
                      {isStudent ? "Today's Timetable & Activities" : "Today's Teaching Schedule"}
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono-code text-txt-muted">
                    Tuesday • 2 Classes
                  </span>
                </div>

                <div className="divide-y divide-border-subtle">
                  <div className="p-3.5 flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[11px] font-semibold text-txt-main">
                          10:00 AM - 12:00 PM
                        </span>
                        <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-emerald-surface text-emerald">
                          Confirmed
                        </span>
                      </div>
                      <h3 className="text-xs font-medium text-txt-main">
                        SMA 2101: Calculus I • Lecture Session
                      </h3>
                      <p className="text-[11px] text-txt-muted">
                        Lecture Theatre 2 • Dr. P. Wanjohi
                      </p>
                    </div>
                    <span className="font-mono-code text-[10px] text-txt-muted">
                      In 2 hrs
                    </span>
                  </div>

                  <div className="p-3.5 flex items-start justify-between bg-surface-2/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[11px] font-semibold text-txt-main">
                          02:00 PM - 03:30 PM
                        </span>
                        <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-amber-surface text-amber">
                          Venue Changed
                        </span>
                      </div>
                      <h3 className="text-xs font-medium text-txt-main">
                        SMA 2104: Linear Algebra I • Problem Session
                      </h3>
                      <p className="text-[11px] text-txt-sub">
                        Room PAM-302 (Moved from LT-01) • Dr. J. Kimani
                      </p>
                    </div>
                    <Link
                      href="/units/sma-2104"
                      className="text-xs text-txt-sub hover:text-txt-main flex items-center gap-1 font-medium"
                    >
                      <span>Unit</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Authoritative Announcements & Verified Updates */}
              <div className="rounded-lg bg-surface-1 border border-border-subtle overflow-hidden">
                <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Inbox size={14} className="text-amber" />
                    <h2 className="text-xs font-semibold text-txt-main">
                      Recent Academic Updates & Notices
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono-code text-txt-muted">
                    Source Verified
                  </span>
                </div>

                <div className="divide-y divide-border-subtle">
                  {liveEvents.map((ev) => (
                    <div key={ev.id} className="p-3.5 space-y-1.5 bg-emerald-surface/20">
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code text-[10px] font-semibold bg-surface-2 px-1.5 py-0.5 rounded text-txt-main">
                            {ev.course_code || "COURSE"}
                          </span>
                          <span className="font-semibold text-xs text-txt-main">
                            {ev.title}
                          </span>
                        </div>
                        <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-emerald-surface text-emerald">
                          Official • Verified
                        </span>
                      </div>
                      {ev.description && (
                        <p className="text-xs text-txt-sub leading-relaxed">
                          {ev.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-1 text-[10px] font-mono-code text-txt-muted">
                        <span>
                          Source: {ev.verified_by_name || "Verified Course Lecturer"}
                        </span>
                        <span>
                          {ev.venue ? `${ev.venue} • ` : ""}
                          {new Date(ev.start_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[10px] font-semibold bg-surface-2 px-1.5 py-0.5 rounded text-txt-main">
                          SMA 2104
                        </span>
                        <span className="font-semibold text-xs text-txt-main">
                          Venue Relocation: Linear Algebra Problem Class
                        </span>
                      </div>
                      <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-emerald-surface text-emerald">
                        Official • Confirmed
                      </span>
                    </div>
                    <p className="text-xs text-txt-sub leading-relaxed">
                      Due to departmental scheduling conflicts, all Tuesday tutorial groups will convene in Room PAM-302 starting today.
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono-code text-txt-muted">
                      <span>Source: Dr. J. Kimani (Lecturer)</span>
                      <span>Today 08:30 AM</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1.5 bg-surface-2/20">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[10px] font-semibold bg-surface-2 px-1.5 py-0.5 rounded text-txt-main">
                          ICS 2105
                        </span>
                        <span className="font-semibold text-xs text-txt-main">
                          Proposed CAT 1 Reschedule to Next Friday
                        </span>
                      </div>
                      <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-amber-surface text-amber flex items-center gap-1">
                        <Clock size={10} />
                        <span>Awaiting Lecturer Confirmation</span>
                      </span>
                    </div>
                    <p className="text-xs text-txt-sub leading-relaxed">
                      Class representative requested shifting the tree traversal test from Wednesday to Friday to avoid collision with pure maths tutorials.
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono-code text-txt-muted">
                      <span>Source: Samantha William (Class Rep)</span>
                      <span>Yesterday 4:15 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Deadlines & Enrolled Units */}
            <div className="lg:col-span-5 space-y-6">
              {/* Upcoming Assessments & Action Items */}
              <div className="rounded-lg bg-surface-1 border border-border-subtle overflow-hidden">
                <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-txt-muted" />
                    <h2 className="text-xs font-semibold text-txt-main">
                      {isStudent ? "Assessments & Deadlines" : "Grading Deadlines"}
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono-code text-txt-muted">
                    3 Pending
                  </span>
                </div>

                <div className="divide-y divide-border-subtle">
                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-[10px] font-semibold text-amber bg-amber-surface px-1.5 py-0.5 rounded">
                        Due Tomorrow • 11:59 PM
                      </span>
                      <span className="font-mono-code text-[10px] text-txt-muted">
                        SMA 2104
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-txt-main">
                      Assignment 3: Orthogonal Projections
                    </h3>
                    <p className="text-[11px] text-txt-muted line-clamp-1">
                      Gram-Schmidt theorem proof & Python script upload
                    </p>
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono-code text-emerald font-medium">
                        Submission ready
                      </span>
                      <Link
                        href="/units/sma-2104/sub-102"
                        className="text-xs text-txt-main font-medium hover:underline flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-[10px] font-semibold text-txt-sub bg-surface-2 px-1.5 py-0.5 rounded">
                        Friday • 5:00 PM
                      </span>
                      <span className="font-mono-code text-[10px] text-txt-muted">
                        ICS 2105
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-txt-main">
                      Lab 2: Self-Balancing Trees Implementation
                    </h3>
                    <p className="text-[11px] text-txt-muted line-clamp-1">
                      C++ / Python code submission for AVL rotation routines
                    </p>
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono-code text-amber font-medium">
                        Not yet submitted
                      </span>
                      <Link
                        href="/units/ics-2105"
                        className="text-xs text-txt-main font-medium hover:underline flex items-center gap-1"
                      >
                        <span>Workspace</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Units Directory Access */}
              <div className="rounded-lg bg-surface-1 border border-border-subtle overflow-hidden">
                <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-txt-muted" />
                    <h2 className="text-xs font-semibold text-txt-main">
                      {isStudent ? "My Enrolled Courses" : "Taught Courses"}
                    </h2>
                  </div>
                  <Link
                    href="/units"
                    className="text-[10px] font-mono-code text-txt-sub hover:text-txt-main"
                  >
                    View All
                  </Link>
                </div>

                <div className="divide-y divide-border-subtle">
                  {MOCK_UNITS.map((unit) => (
                    <Link
                      key={unit.id}
                      href={`/units/${unit.id}`}
                      className="p-3 flex items-center justify-between hover:bg-surface-2 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code text-xs font-semibold text-txt-main">
                            {unit.code}
                          </span>
                          {unit.unreadCount > 0 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                          )}
                        </div>
                        <p className="text-[11px] text-txt-muted mt-0.5 truncate max-w-[200px]">
                          {unit.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-right">
                        <span className="font-mono-code text-[10px] text-txt-muted">
                          {unit.totalSubmissions} items
                        </span>
                        <ChevronRight size={13} className="text-txt-muted" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

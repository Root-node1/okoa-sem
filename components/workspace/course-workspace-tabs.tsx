"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UnitModule,
  AcademicEvent,
  CourseMaterial,
  AssignmentTask,
  QueueItem,
} from "@/types/workspace";
import { formatAcademicDate } from "@/data/mock-academic-data";
import {
  CalendarDays,
  FileText,
  CheckSquare,
  MessageSquare,
  CheckCircle2,
  Clock,
  MapPin,
  Download,
  ChevronRight,
  Upload,
} from "lucide-react";

interface CourseWorkspaceTabsProps {
  unit: UnitModule;
  events: AcademicEvent[];
  materials: CourseMaterial[];
  assignments: AssignmentTask[];
  threads: QueueItem[];
}

type CourseTab = "overview" | "materials" | "assessments" | "threads";

export function CourseWorkspaceTabs({
  unit,
  events,
  materials,
  assignments,
  threads,
}: CourseWorkspaceTabsProps) {
  const [tab, setTab] = useState<CourseTab>("overview");

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-1 select-none overflow-hidden">
      {/* Course Header */}
      <header className="px-6 py-4 border-b border-border-subtle bg-surface-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded bg-surface-2 border border-border-strong text-txt-main">
              {unit.code}
            </span>
            <span className="text-xs text-txt-muted font-mono-code">
              {unit.lecturer} • {unit.venue}
            </span>
          </div>
          <h1 className="font-serif-display text-xl font-semibold text-txt-main">
            {unit.name}
          </h1>
          <p className="text-[11px] font-mono-code text-txt-muted">
            Schedule: {unit.schedule}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/inbox"
            className="h-8 px-3 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle flex items-center gap-1.5 transition-colors"
          >
            <Upload size={12} />
            <span>Share Update</span>
          </Link>
          {threads.length > 0 && (
            <Link
              href={`/units/${unit.id}/${threads[0].id}`}
              className="h-8 px-3 rounded text-xs font-medium bg-txt-main text-canvas hover:opacity-90 flex items-center gap-1.5 transition-opacity"
            >
              <MessageSquare size={12} />
              <span>Review Submissions ({threads.length})</span>
            </Link>
          )}
        </div>
      </header>

      {/* Course Tabs Bar */}
      <div className="px-6 border-b border-border-subtle bg-surface-2/40 flex items-center gap-6 overflow-x-auto flex-shrink-0">
        <button
          onClick={() => setTab("overview")}
          className={`py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            tab === "overview"
              ? "border-txt-main text-txt-main"
              : "border-transparent text-txt-muted hover:text-txt-main"
          }`}
        >
          <CalendarDays size={13} />
          <span>Overview & Confirmed Schedule</span>
        </button>

        <button
          onClick={() => setTab("materials")}
          className={`py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            tab === "materials"
              ? "border-txt-main text-txt-main"
              : "border-transparent text-txt-muted hover:text-txt-main"
          }`}
        >
          <FileText size={13} />
          <span>Course Materials</span>
          <span className="font-mono-code text-[10px] px-1.5 py-0.2 rounded bg-surface-3 text-txt-main">
            {materials.length}
          </span>
        </button>

        <button
          onClick={() => setTab("assessments")}
          className={`py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            tab === "assessments"
              ? "border-txt-main text-txt-main"
              : "border-transparent text-txt-muted hover:text-txt-main"
          }`}
        >
          <CheckSquare size={13} />
          <span>Assessments & Tasks</span>
          <span className="font-mono-code text-[10px] px-1.5 py-0.2 rounded bg-surface-3 text-txt-main">
            {assignments.length}
          </span>
        </button>

        <button
          onClick={() => setTab("threads")}
          className={`py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            tab === "threads"
              ? "border-txt-main text-txt-main"
              : "border-transparent text-txt-muted hover:text-txt-main"
          }`}
        >
          <MessageSquare size={13} />
          <span>Submissions & Discussion Queue</span>
          <span className="font-mono-code text-[10px] px-1.5 py-0.2 rounded bg-surface-3 text-txt-main">
            {threads.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-canvas/30">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Course Summary Strip (from Leon's CourseWorkspacePage) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-txt-muted block">
                Confirmed Events
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <strong className="font-serif-display text-2xl font-semibold text-txt-main">
                  {String(events.length).padStart(2, "0")}
                </strong>
                <span className="text-[10px] font-mono-code text-emerald">
                  Verified schedule
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-txt-muted block">
                Semester Syllabus Progress
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <strong className="font-serif-display text-2xl font-semibold text-txt-main">
                  {unit.progress}%
                </strong>
                <span className="text-[10px] font-mono-code text-txt-muted">
                  Week 8 of 14
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-txt-muted block">
                Next Milestone
              </span>
              <div className="mt-1">
                <strong className="text-xs font-semibold text-txt-main block truncate">
                  {unit.nextEvent}
                </strong>
                <span className="text-[10px] font-mono-code text-amber">
                  Confirmed by {unit.lecturer}
                </span>
              </div>
            </div>
          </div>

          {tab === "overview" && (
            <div className="space-y-4">
              <div className="rounded-lg bg-surface-1 border border-border-subtle overflow-hidden">
                <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-semibold text-txt-main">
                      Confirmed Course Events & Deadlines
                    </h2>
                    <p className="text-[11px] text-txt-muted">
                      Only verified dates and venues appear on the course timeline
                    </p>
                  </div>
                  <span className="h-5 px-2 rounded text-[10px] font-mono-code font-semibold bg-emerald-surface text-emerald flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    <span>Verified Only</span>
                  </span>
                </div>

                <div className="divide-y divide-border-subtle">
                  {events.map((evt) => (
                    <article
                      key={evt.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded bg-surface-2 border border-border-strong flex flex-col items-center justify-center shrink-0">
                          <span className="text-xs font-mono-code font-bold text-txt-main">
                            {new Date(`${evt.date}T12:00:00`).getDate()}
                          </span>
                          <span className="text-[9px] font-mono-code uppercase text-txt-muted">
                            {new Date(`${evt.date}T12:00:00`).toLocaleDateString(
                              "en-KE",
                              { month: "short" }
                            )}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono-code text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-surface-2 text-txt-sub">
                              {evt.type}
                            </span>
                            <h3 className="text-xs font-semibold text-txt-main">
                              {evt.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono-code text-txt-muted">
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {formatAcademicDate(evt.date)} • {evt.time}
                            </span>
                            {evt.venue && (
                              <span className="flex items-center gap-1">
                                <MapPin size={11} />
                                {evt.venue}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {evt.source && (
                        <span className="text-[10px] font-mono-code text-txt-muted">
                          {evt.source}
                        </span>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "materials" && (
            <div className="rounded-lg bg-surface-1 border border-border-subtle divide-y divide-border-subtle overflow-hidden">
              {materials.map((mat) => (
                <article
                  key={mat.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-surface-2/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded bg-surface-2 border border-border-subtle flex items-center justify-center text-txt-main shrink-0">
                      <FileText size={15} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-2 text-txt-sub">
                          {mat.type}
                        </span>
                        <span className="font-mono-code text-[10px] text-txt-muted">
                          {mat.fileSize}
                        </span>
                      </div>
                      <h3 className="text-xs font-semibold text-txt-main mt-1">
                        {mat.title}
                      </h3>
                      <p className="text-[11px] text-txt-muted font-mono-code mt-0.5">
                        Uploaded by {mat.uploadedBy} • {mat.uploadedAt}
                      </p>
                    </div>
                  </div>

                  <button className="h-8 px-3 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle flex items-center gap-1.5 transition-colors">
                    <Download size={12} />
                    <span>Download</span>
                  </button>
                </article>
              ))}
            </div>
          )}

          {tab === "assessments" && (
            <div className="rounded-lg bg-surface-1 border border-border-subtle divide-y divide-border-subtle overflow-hidden">
              {assignments.map((asg) => (
                <article
                  key={asg.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold uppercase ${
                          asg.status === "Submitted"
                            ? "bg-emerald-surface text-emerald"
                            : "bg-amber-surface text-amber"
                        }`}
                      >
                        {asg.status}
                      </span>
                      <span className="font-mono-code text-[10px] text-txt-muted">
                        {asg.weight}
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-txt-main">
                      {asg.title}
                    </h3>
                    <p className="text-xs text-txt-sub">{asg.description}</p>
                  </div>

                  <Link
                    href="/tasks"
                    className="h-8 px-3 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <span>Manage Task</span>
                    <ChevronRight size={12} />
                  </Link>
                </article>
              ))}
            </div>
          )}

          {tab === "threads" && (
            <div className="rounded-lg bg-surface-1 border border-border-subtle divide-y divide-border-subtle overflow-hidden">
              {threads.length > 0 ? (
                threads.map((item) => (
                  <Link
                    key={item.id}
                    href={`/units/${unit.id}/${item.id}`}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-surface-2/40 transition-colors block"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-2 text-txt-main">
                          {item.student.name} ({item.student.regNumber})
                        </span>
                        <span className="font-mono-code text-[10px] text-amber">
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-xs font-semibold text-txt-main">
                        {item.title}
                      </h3>
                      <p className="text-xs text-txt-sub line-clamp-1">
                        {item.snippet}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-medium text-txt-main shrink-0">
                      <span>Inspect Thread</span>
                      <ChevronRight size={13} />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center space-y-1">
                  <h3 className="text-xs font-semibold text-txt-main">
                    No active submission threads for {unit.code}
                  </h3>
                  <p className="text-xs text-txt-muted">
                    Student proof checks and code reviews for this unit will appear here.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

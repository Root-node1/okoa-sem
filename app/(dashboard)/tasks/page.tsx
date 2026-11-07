"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_ASSIGNMENTS, formatAcademicDate } from "@/data/mock-academic-data";
import { AssignmentTask } from "@/types/workspace";
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  FileText,
  ChevronRight,
} from "lucide-react";

export default function TasksPage() {
  const [filter, setFilter] = useState("All assignments");
  const [items, setItems] = useState<AssignmentTask[]>(MOCK_ASSIGNMENTS);

  const visible = items.filter(
    (item) => filter === "All assignments" || item.status === filter
  );

  function markSubmitted(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Submitted", progress: 100 }
          : item
      )
    );
  }

  const dueCount = items.filter((i) => i.status !== "Submitted").length;
  const inProgressCount = items.filter((i) => i.status === "In progress").length;
  const submittedCount = items.filter((i) => i.status === "Submitted").length;

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-1 select-none overflow-hidden">
      {/* Header */}
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-border-strong flex items-center justify-center text-indigo">
            <CheckSquare size={16} />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-txt-main">
              Academic Tasks & Assignment Deadlines
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              Track coursework progress, submission receipts, and upcoming due dates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="task-status-filter"
            className="text-[11px] font-mono-code text-txt-muted"
          >
            Status:
          </label>
          <select
            id="task-status-filter"
            aria-label="Filter assignments"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-7 px-2.5 rounded text-xs bg-surface-2 border border-border-subtle text-txt-main focus:outline-none"
          >
            <option value="All assignments">All assignments</option>
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Submitted">Submitted</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-canvas/30">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Compact Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-txt-muted block">
                Pending Action
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <strong className="font-serif-display text-2xl font-semibold text-txt-main">
                  {String(dueCount).padStart(2, "0")}
                </strong>
                <span className="text-[11px] font-mono-code text-amber">
                  1 due tomorrow
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-txt-muted block">
                In Progress
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <strong className="font-serif-display text-2xl font-semibold text-txt-main">
                  {String(inProgressCount).padStart(2, "0")}
                </strong>
                <span className="text-[11px] font-mono-code text-txt-sub">
                  Active drafts
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-txt-muted block">
                Submitted & Recorded
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <strong className="font-serif-display text-2xl font-semibold text-txt-main">
                  {String(submittedCount).padStart(2, "0")}
                </strong>
                <span className="text-[11px] font-mono-code text-emerald">
                  Receipt verified
                </span>
              </div>
            </div>
          </div>

          {/* Assignment List */}
          <div className="rounded-lg bg-surface-1 border border-border-subtle divide-y divide-border-subtle overflow-hidden">
            {visible.map((assignment) => (
              <article
                key={assignment.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-2/30 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-2 text-txt-main border border-border-subtle">
                      {assignment.courseCode}
                    </span>
                    <span
                      className={`h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold uppercase ${
                        assignment.status === "Submitted"
                          ? "bg-emerald-surface text-emerald"
                          : assignment.status === "In progress"
                          ? "bg-indigo-surface text-indigo"
                          : "bg-surface-3 text-txt-sub"
                      }`}
                    >
                      {assignment.status}
                    </span>
                    <span className="text-[10px] font-mono-code text-txt-muted">
                      Weight: {assignment.weight}
                    </span>
                  </div>

                  <h2 className="text-xs font-semibold text-txt-main">
                    {assignment.title}
                  </h2>

                  <p className="text-xs text-txt-sub leading-relaxed">
                    {assignment.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] font-mono-code text-txt-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>
                        Due{" "}
                        {formatAcademicDate(assignment.dueAt, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </span>

                    <div className="flex items-center gap-2 w-44">
                      <div className="h-1.5 flex-1 bg-surface-2 rounded-full overflow-hidden border border-border-subtle">
                        <div
                          className={`h-full rounded-full ${
                            assignment.status === "Submitted"
                              ? "bg-emerald"
                              : "bg-txt-main"
                          }`}
                          style={{ width: `${assignment.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px]">
                        {assignment.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/units/${assignment.unitId}`}
                    className="h-8 px-3 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle flex items-center gap-1 transition-colors"
                  >
                    <FileText size={12} />
                    <span>Course</span>
                  </Link>

                  {assignment.status !== "Submitted" ? (
                    <button
                      onClick={() => markSubmitted(assignment.id)}
                      className="h-8 px-3 rounded text-xs font-medium bg-txt-main text-canvas hover:opacity-90 flex items-center gap-1.5 transition-opacity"
                    >
                      <span>Mark Submitted</span>
                      <ChevronRight size={12} />
                    </button>
                  ) : (
                    <span className="h-8 px-3 rounded text-xs font-mono-code font-medium bg-emerald-surface text-emerald flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      <span>Submitted</span>
                    </span>
                  )}
                </div>
              </article>
            ))}

            {visible.length === 0 && (
              <div className="p-8 text-center space-y-1">
                <h3 className="text-xs font-semibold text-txt-main">
                  No assignments match this filter
                </h3>
                <p className="text-xs text-txt-muted">
                  Switch the status filter above to inspect other coursework.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

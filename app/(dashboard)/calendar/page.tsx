"use client";

import { useMemo, useState } from "react";
import { MOCK_EVENTS, formatAcademicDate } from "@/data/mock-academic-data";
import { MOCK_UNITS } from "@/data/mock-units";
import { AcademicEvent } from "@/types/workspace";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";

type ViewMode = "Month" | "Week" | "Agenda";

function addDays(date: string, offset: number) {
  const result = new Date(`${date}T12:00:00`);
  result.setDate(result.getDate() + offset);
  return result.toISOString().slice(0, 10);
}

export default function CalendarPage() {
  const [view, setView] = useState<ViewMode>("Week");
  const [month, setMonth] = useState(new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState("2026-11-09");
  const [courseFilter, setCourseFilter] = useState("ALL");

  const verifiedEvents = useMemo(
    () =>
      MOCK_EVENTS.filter(
        (evt) =>
          evt.verified &&
          (courseFilter === "ALL" || evt.courseCode === courseFilter)
      ),
    [courseFilter]
  );

  const monthLabel = month.toLocaleDateString("en-KE", {
    month: "long",
    year: "numeric",
  });

  const eventsForDay = (date: string) =>
    verifiedEvents.filter((event) => event.date === date);

  const weekDates =
    view === "Week"
      ? Array.from({ length: 7 }, (_, index) =>
          addDays(
            selectedDate,
            index - new Date(`${selectedDate}T12:00:00`).getDay() + 1
          )
        )
      : [];

  function moveMonth(amount: number) {
    setMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + amount, 1)
    );
  }

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7) cells.push(null);

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-1 select-none overflow-hidden">
      {/* Header */}
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-border-strong flex items-center justify-center text-emerald">
            <CalendarDays size={16} />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-txt-main">
              Academic Schedule & Deadlines
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              Showing confirmed lectures, CATs, and assessment deadlines
            </p>
          </div>
        </div>

        {/* View Switcher & Course Filter */}
        <div className="flex items-center gap-3">
          <select
            aria-label="Filter calendar by course"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="h-7 px-2.5 rounded text-xs bg-surface-2 border border-border-subtle text-txt-main focus:outline-none font-mono-code"
          >
            <option value="ALL">All Units (4)</option>
            {MOCK_UNITS.map((u) => (
              <option key={u.id} value={u.code}>
                {u.code}
              </option>
            ))}
          </select>

          <div
            className="flex items-center rounded-md bg-surface-2 p-0.5 border border-border-subtle"
            role="tablist"
            aria-label="Calendar view mode"
          >
            {(["Month", "Week", "Agenda"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                role="tab"
                aria-selected={view === mode}
                onClick={() => setView(mode)}
                className={`h-6 px-2.5 rounded text-xs font-medium transition-colors ${
                  view === mode
                    ? "bg-surface-1 text-txt-main border border-border-subtle"
                    : "text-txt-muted hover:text-txt-main"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Calendar Canvas */}
      <div className="flex-1 overflow-y-auto p-6 bg-canvas/30">
        <div className="max-w-6xl mx-auto space-y-5">
          {/* Month & Date Controls */}
          <div className="flex items-center justify-between bg-surface-1 px-4 py-3 rounded-lg border border-border-subtle">
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous month"
                onClick={() => moveMonth(-1)}
                className="p-1 rounded hover:bg-surface-2 text-txt-muted hover:text-txt-main transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              <h2 className="font-serif-display text-base font-semibold text-txt-main min-w-[140px] text-center">
                {monthLabel}
              </h2>
              <button
                aria-label="Next month"
                onClick={() => moveMonth(1)}
                className="p-1 rounded hover:bg-surface-2 text-txt-muted hover:text-txt-main transition-colors"
              >
                <ChevronRight size={15} />
              </button>
              <button
                onClick={() => {
                  setMonth(new Date(2026, 10, 1));
                  setSelectedDate("2026-11-09");
                }}
                className="ml-2 h-6 px-2 rounded text-[11px] font-mono-code bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle transition-colors"
              >
                Today (Nov 7)
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-[11px] text-txt-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald" />
                <span>CAT / Exam</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber" />
                <span>Deadline / Assignment</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo" />
                <span>Lecture / Problem Session</span>
              </span>
            </div>
          </div>

          {/* Week View */}
          {view === "Week" && (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5">
              {weekDates.map((date) => {
                const dayEvents = eventsForDay(date);
                const parsed = new Date(`${date}T12:00:00`);
                const isSelected = selectedDate === date;

                return (
                  <div
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`min-h-[210px] p-3 rounded-lg border transition-colors cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-surface-1 border-border-strong"
                        : "bg-surface-1/80 border-border-subtle hover:border-border-strong"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-subtle">
                        <span className="text-[10px] font-mono-code uppercase text-txt-muted">
                          {parsed.toLocaleDateString("en-KE", {
                            weekday: "short",
                          })}
                        </span>
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono-code font-semibold ${
                            isSelected
                              ? "bg-txt-main text-canvas"
                              : "text-txt-main"
                          }`}
                        >
                          {parsed.getDate()}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {dayEvents.map((evt: AcademicEvent) => (
                          <div
                            key={evt.id}
                            className={`p-2 rounded border text-left space-y-1 ${
                              evt.type === "CAT" || evt.type === "Exam"
                                ? "bg-emerald-surface/60 border-emerald/30"
                                : evt.type === "Deadline" ||
                                  evt.type === "Assignment"
                                ? "bg-amber-surface/60 border-amber/30"
                                : "bg-surface-2 border-border-subtle"
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono-code">
                              <span className="font-bold text-txt-main">
                                {evt.courseCode}
                              </span>
                              <span className="text-txt-muted">{evt.time}</span>
                            </div>
                            <p className="text-[11px] font-medium text-txt-main leading-snug">
                              {evt.title}
                            </p>
                            {evt.venue && (
                              <span className="block text-[10px] font-mono-code text-txt-muted">
                                {evt.venue}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {dayEvents.length === 0 && (
                      <span className="text-[10px] font-mono-code text-txt-muted">
                        No scheduled items
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Month View */}
          {view === "Month" && (
            <div className="rounded-lg bg-surface-1 border border-border-subtle overflow-hidden">
              <div className="grid grid-cols-7 border-b border-border-subtle bg-surface-2/50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div
                    key={d}
                    className="py-2 text-center text-[10px] font-mono-code uppercase font-semibold text-txt-muted"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 divide-x divide-y divide-border-subtle">
                {cells.map((day, idx) => {
                  if (!day) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="min-h-[96px] bg-surface-2/20"
                      />
                    );
                  }
                  const date = `${month.getFullYear()}-${String(
                    month.getMonth() + 1
                  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayEvents = eventsForDay(date);
                  const isSelected = selectedDate === date;

                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`min-h-[96px] p-2 text-left flex flex-col justify-between transition-colors ${
                        isSelected
                          ? "bg-surface-2"
                          : "bg-surface-1 hover:bg-surface-2/40"
                      }`}
                    >
                      <span className="text-xs font-mono-code font-medium text-txt-main">
                        {day}
                      </span>
                      <div className="space-y-1 w-full mt-1">
                        {dayEvents.slice(0, 2).map((evt) => (
                          <span
                            key={evt.id}
                            className="block truncate px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-surface-3 text-txt-main"
                          >
                            {evt.courseCode}: {evt.title}
                          </span>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="block text-[9px] font-mono-code text-txt-muted">
                            +{dayEvents.length - 2} more
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Agenda View */}
          {view === "Agenda" && (
            <div className="rounded-lg bg-surface-1 border border-border-subtle divide-y divide-border-subtle overflow-hidden">
              {verifiedEvents
                .slice()
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((evt) => (
                  <article
                    key={evt.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-2/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-md bg-surface-2 border border-border-strong flex flex-col items-center justify-center shrink-0">
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
                          <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-2 text-txt-main border border-border-subtle">
                            {evt.courseCode}
                          </span>
                          <span className="font-mono-code text-[10px] text-txt-muted uppercase">
                            {evt.type}
                          </span>
                          <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-emerald-surface text-emerald flex items-center gap-1">
                            <CheckCircle2 size={10} />
                            <span>Verified</span>
                          </span>
                        </div>

                        <h3 className="text-xs font-semibold text-txt-main">
                          {evt.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-txt-sub font-mono-code">
                          <span className="flex items-center gap-1">
                            <Clock size={11} className="text-txt-muted" />
                            {formatAcademicDate(evt.date)} • {evt.time}
                          </span>
                          {evt.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin size={11} className="text-txt-muted" />
                              {evt.venue}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {evt.source && (
                      <span className="text-[10px] font-mono-code text-txt-muted">
                        Source: {evt.source}
                      </span>
                    )}
                  </article>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

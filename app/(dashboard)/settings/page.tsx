"use client";

import { useState, FormEvent } from "react";
import { useAuthRole } from "@/hooks/use-auth-role";
import { Settings, CheckCircle2, ArrowRightLeft, Bell, User } from "lucide-react";

export default function SettingsPage() {
  const { user, role, toggleRole, isStudent } = useAuthRole();
  const [saved, setSaved] = useState(false);

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-1 select-none overflow-hidden">
      {/* Header */}
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-border-strong flex items-center justify-center text-txt-main">
            <Settings size={16} />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-txt-main">
              Account & Coordination Preferences
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              Manage your academic identity, active workspace role, and alert preferences
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleRole}
          className="h-7 px-2.5 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle flex items-center gap-1.5 transition-colors"
        >
          <ArrowRightLeft size={12} className="text-amber" />
          <span>Switch to {isStudent ? "Lecturer" : "Student"} Mode</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-canvas/30">
        <form
          onSubmit={handleSave}
          onChange={() => setSaved(false)}
          className="max-w-3xl mx-auto space-y-6"
        >
          {saved && (
            <div
              aria-live="polite"
              className="p-3 rounded-md bg-emerald-surface border border-emerald/30 flex items-center gap-2 text-xs text-emerald"
            >
              <CheckCircle2 size={14} />
              <span>Preferences saved for your current session.</span>
            </div>
          )}

          {/* Profile Section */}
          <section className="p-5 rounded-lg bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
              <User size={14} className="text-txt-muted" />
              <h2 className="text-xs font-semibold text-txt-main">
                Academic Profile ({role})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono-code uppercase text-txt-muted mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  key={`name-${user.id}`}
                  defaultValue={user.name}
                  className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle text-txt-main focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-code uppercase text-txt-muted mb-1">
                  University Email
                </label>
                <input
                  type="email"
                  key={`email-${user.id}`}
                  defaultValue={user.email}
                  className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle text-txt-main focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-code uppercase text-txt-muted mb-1">
                  {isStudent ? "Registration Identifier" : "Staff Identifier"}
                </label>
                <input
                  type="text"
                  readOnly
                  value={user.identifier}
                  className="w-full h-9 px-3 rounded text-xs font-mono-code bg-surface-2/60 border border-border-subtle text-txt-muted"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-code uppercase text-txt-muted mb-1">
                  Department / Programme
                </label>
                <input
                  type="text"
                  readOnly
                  value={user.programme || user.department}
                  className="w-full h-9 px-3 rounded text-xs bg-surface-2/60 border border-border-subtle text-txt-muted"
                />
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="p-5 rounded-lg bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
              <Bell size={14} className="text-txt-muted" />
              <h2 className="text-xs font-semibold text-txt-main">
                Coordination & Alert Preferences
              </h2>
            </div>

            <div className="divide-y divide-border-subtle">
              <label className="py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block text-xs font-medium text-txt-main">
                    Deadline & CAT Reminders
                  </span>
                  <span className="block text-[11px] text-txt-muted">
                    Receive a notification 24 hours before any verified assessment deadline.
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-zinc-900"
                />
              </label>

              <label className="py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block text-xs font-medium text-txt-main">
                    Confirmed Venue & Timetable Changes
                  </span>
                  <span className="block text-[11px] text-txt-muted">
                    Immediate alert when a lecturer confirms a room or schedule change.
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-zinc-900"
                />
              </label>

              <label className="py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block text-xs font-medium text-txt-main">
                    Weekly Academic Digest
                  </span>
                  <span className="block text-[11px] text-txt-muted">
                    Summary of upcoming lectures, problem sets, and unverified claims every Monday morning.
                  </span>
                </div>
                <input type="checkbox" className="h-4 w-4 accent-zinc-900" />
              </label>
            </div>
          </section>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] font-mono-code text-txt-muted">
              Changes apply immediately to this preview workspace.
            </span>
            <button
              type="submit"
              className="h-8 px-4 rounded text-xs font-medium bg-txt-main text-canvas hover:opacity-90 transition-opacity"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, FormEvent } from "react";
import { useAuthRole } from "@/hooks/use-auth-role";
import {
  MOCK_CLAIMS,
  MOCK_NOTIFICATIONS,
} from "@/data/mock-academic-data";
import { MOCK_UNITS } from "@/data/mock-units";
import { Claim, ClaimStatus } from "@/types/workspace";
import {
  Inbox,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Upload,
  ShieldCheck,
  Bell,
  FileText,
  Sparkles,
} from "lucide-react";

type InboxTab = "updates" | "claims" | "submit";

export default function InboxPage() {
  const { isStudent, isLecturer } = useAuthRole();
  const [tab, setTab] = useState<InboxTab>("updates");
  const [filter, setFilter] = useState<string>("All items");
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [selectedCourse, setSelectedCourse] = useState("SMA 2104");
  const [claimTitle, setClaimTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [feedbackNotice, setFeedbackNotice] = useState("");

  function handleMarkAllRead() {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
  }

  function handleVerifyClaim(id: string, nextStatus: ClaimStatus) {
    setClaims((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
    );
  }

  function handleSubmitUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!messageText.trim()) return;

    const unit =
      MOCK_UNITS.find((u) => u.code === selectedCourse) || MOCK_UNITS[0];
    const newClaim: Claim = {
      id: `clm-${Date.now()}`,
      unitId: unit.id,
      courseCode: unit.code,
      title: claimTitle.trim() || "Submitted Course Update",
      source: isLecturer
        ? "Official Lecturer Announcement"
        : "Student / Class Rep Submission",
      submittedAt: "Just now",
      status: isLecturer ? "Verified" : "Pending review",
      confidence: isLecturer ? 100 : 88,
      evidence: `“${messageText.trim()}”`,
    };

    setClaims((prev) => [newClaim, ...prev]);
    setClaimTitle("");
    setMessageText("");
    setFeedbackNotice(
      isLecturer
        ? "Published as a verified official course update."
        : "Submitted to the course verification queue. It will appear as confirmed once verified by course staff."
    );
    setTab("claims");
  }

  const visibleClaims = claims.filter(
    (c) => filter === "All items" || c.status === filter
  );
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-1 select-none overflow-hidden">
      {/* Header */}
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-border-strong flex items-center justify-center text-amber">
            <Inbox size={16} />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-txt-main">
              {isStudent
                ? "Academic Inbox & Course Updates"
                : "Course Claims & Verification Inbox"}
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              Distinguishing verified official announcements from unconfirmed
              class updates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tab === "updates" && unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="h-7 px-2.5 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle transition-colors"
            >
              Mark all read ({unreadCount})
            </button>
          )}
          <button
            onClick={() => setTab("submit")}
            className="h-7 px-3 rounded text-xs font-medium bg-txt-main text-canvas hover:opacity-90 flex items-center gap-1.5 transition-opacity"
          >
            <Upload size={12} />
            <span>{isLecturer ? "Publish Official Notice" : "Share an Update"}</span>
          </button>
        </div>
      </header>

      {/* Sub-navigation Tabs */}
      <div className="px-6 border-b border-border-subtle bg-surface-2/40 flex items-center justify-between">
        <div className="flex items-center gap-6" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "updates"}
            onClick={() => setTab("updates")}
            className={`py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === "updates"
                ? "border-txt-main text-txt-main"
                : "border-transparent text-txt-muted hover:text-txt-main"
            }`}
          >
            <Bell size={13} />
            <span>Course Notifications</span>
            <span className="font-mono-code text-[10px] px-1.5 py-0.2 rounded bg-surface-3 text-txt-main">
              {notifications.length}
            </span>
          </button>

          <button
            role="tab"
            aria-selected={tab === "claims"}
            onClick={() => setTab("claims")}
            className={`py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === "claims"
                ? "border-txt-main text-txt-main"
                : "border-transparent text-txt-muted hover:text-txt-main"
            }`}
          >
            <ShieldCheck size={13} />
            <span>Verification Queue & Provenance</span>
            <span className="font-mono-code text-[10px] px-1.5 py-0.2 rounded bg-surface-3 text-txt-main">
              {claims.length}
            </span>
          </button>

          <button
            role="tab"
            aria-selected={tab === "submit"}
            onClick={() => setTab("submit")}
            className={`py-2.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              tab === "submit"
                ? "border-txt-main text-txt-main"
                : "border-transparent text-txt-muted hover:text-txt-main"
            }`}
          >
            <Upload size={13} />
            <span>{isLecturer ? "Post Announcement" : "Submit Course Update"}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-canvas/30">
        <div className="max-w-5xl mx-auto space-y-5">
          {feedbackNotice && (
            <div className="p-3 rounded-md bg-emerald-surface border border-emerald/30 flex items-center justify-between text-xs text-emerald">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} />
                <span>{feedbackNotice}</span>
              </div>
              <button
                onClick={() => setFeedbackNotice("")}
                className="text-[11px] font-mono-code underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {tab === "updates" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 Cols: Course Notifications */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-txt-muted font-mono-code">
                    Recent Course Communications
                  </h2>
                  <span className="text-[11px] font-mono-code text-txt-muted">
                    {unreadCount} unread
                  </span>
                </div>

                <div className="divide-y divide-border-subtle rounded-lg bg-surface-1 border border-border-subtle overflow-hidden">
                  {notifications.map((item) => (
                    <article
                      key={item.id}
                      className={`p-4 space-y-1.5 transition-colors ${
                        item.unread ? "bg-surface-1" : "bg-surface-2/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-2 text-txt-main border border-border-subtle">
                            {item.courseCode}
                          </span>
                          {item.verified ? (
                            <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-emerald-surface text-emerald flex items-center gap-1">
                              <CheckCircle2 size={10} />
                              <span>Confirmed</span>
                            </span>
                          ) : (
                            <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-amber-surface text-amber flex items-center gap-1">
                              <Clock size={10} />
                              <span>Awaiting Confirmation</span>
                            </span>
                          )}
                          {item.unread && (
                            <span className="w-2 h-2 rounded-full bg-amber" />
                          )}
                        </div>
                        <time className="font-mono-code text-[10px] text-txt-muted">
                          {item.time}
                        </time>
                      </div>

                      <h3 className="text-xs font-semibold text-txt-main">
                        {item.title}
                      </h3>
                      <p className="text-xs text-txt-sub leading-relaxed">
                        {item.body}
                      </p>
                      <div className="pt-1 text-[10px] font-mono-code text-txt-muted">
                        Source: {item.source}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Unverified Claims Teaser */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-txt-muted font-mono-code">
                    Unverified Updates in Review
                  </h2>
                  <span className="text-[11px] font-mono-code text-amber">
                    {claims.filter((c) => c.status !== "Verified").length} pending
                  </span>
                </div>

                <div className="space-y-3">
                  {claims
                    .filter((item) => item.status !== "Verified")
                    .map((item) => (
                      <article
                        key={item.id}
                        className="p-4 rounded-lg bg-surface-1 border border-border-subtle space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-2 text-txt-main">
                            {item.courseCode}
                          </span>
                          <span
                            className={`h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold ${
                              item.status === "Needs attention"
                                ? "bg-crimson-surface text-crimson"
                                : "bg-amber-surface text-amber"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <h3 className="text-xs font-semibold text-txt-main">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-txt-muted font-mono-code">
                          {item.source} • {item.submittedAt}
                        </p>

                        <div className="p-2.5 rounded bg-surface-2/60 border border-border-subtle text-[11px] text-txt-sub flex items-start gap-2">
                          <AlertTriangle
                            size={13}
                            className="text-amber shrink-0 mt-0.5"
                          />
                          <span>
                            This update is not yet confirmed by the course
                            lecturer and has not altered the official calendar.
                          </span>
                        </div>

                        {isLecturer && (
                          <div className="pt-1 flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleVerifyClaim(item.id, "Verified")
                              }
                              className="h-7 px-2.5 rounded text-xs font-medium bg-emerald text-white hover:opacity-90 transition-opacity"
                            >
                              Confirm & Verify
                            </button>
                            <button
                              onClick={() =>
                                handleVerifyClaim(item.id, "Needs attention")
                              }
                              className="h-7 px-2.5 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle transition-colors"
                            >
                              Flag Discrepancy
                            </button>
                          </div>
                        )}
                      </article>
                    ))}
                </div>
              </div>
            </div>
          )}

          {tab === "claims" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-1 p-4 rounded-lg border border-border-subtle">
                <div>
                  <h2 className="text-xs font-semibold text-txt-main">
                    Extracted Claims & Information Provenance
                  </h2>
                  <p className="text-[11px] text-txt-muted">
                    Every academic claim tracks its original source message and
                    verification state.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="claim-status-filter"
                    className="text-[11px] font-mono-code text-txt-muted"
                  >
                    Filter:
                  </label>
                  <select
                    id="claim-status-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="h-8 px-2.5 rounded text-xs bg-surface-2 border border-border-subtle text-txt-main focus:outline-none"
                  >
                    <option value="All items">All items</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending review">Pending review</option>
                    <option value="Processing">Processing</option>
                    <option value="Needs attention">Needs attention</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {visibleClaims.map((claim) => (
                  <article
                    key={claim.id}
                    className="p-4 rounded-lg bg-surface-1 border border-border-subtle space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-txt-muted" />
                        <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-2 text-txt-main">
                          {claim.courseCode}
                        </span>
                        <h3 className="text-xs font-semibold text-txt-main">
                          {claim.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {claim.confidence !== undefined && (
                          <span className="font-mono-code text-[10px] text-txt-muted flex items-center gap-1 bg-surface-2 px-2 py-0.5 rounded">
                            <Sparkles size={10} className="text-amber" />
                            <span>{claim.confidence}% extraction match</span>
                          </span>
                        )}
                        <span
                          className={`h-5 px-2 rounded text-[10px] font-mono-code font-semibold flex items-center gap-1 ${
                            claim.status === "Verified"
                              ? "bg-emerald-surface text-emerald"
                              : claim.status === "Needs attention"
                              ? "bg-crimson-surface text-crimson"
                              : "bg-amber-surface text-amber"
                          }`}
                        >
                          {claim.status}
                        </span>
                      </div>
                    </div>

                    <blockquote className="p-3 rounded bg-surface-2/70 border-l-2 border-l-txt-main font-mono-code text-xs text-txt-sub">
                      {claim.evidence}
                    </blockquote>

                    <div className="flex items-center justify-between text-[11px] font-mono-code text-txt-muted pt-1">
                      <span>
                        Source: {claim.source} • Submitted {claim.submittedAt}
                      </span>

                      {isLecturer && claim.status !== "Verified" && (
                        <button
                          onClick={() =>
                            handleVerifyClaim(claim.id, "Verified")
                          }
                          className="h-6 px-2.5 rounded text-[11px] font-sans font-medium bg-txt-main text-canvas hover:opacity-90"
                        >
                          Approve as Official
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {tab === "submit" && (
            <div className="max-w-2xl mx-auto p-6 rounded-lg bg-surface-1 border border-border-subtle space-y-5">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-amber font-semibold">
                  {isLecturer
                    ? "Official Faculty Notice"
                    : "Community Information Capture"}
                </span>
                <h2 className="font-serif-display text-lg font-semibold text-txt-main mt-0.5">
                  {isLecturer
                    ? "Publish a Verified Course Update"
                    : "Found a course update or forwarded message?"}
                </h2>
                <p className="text-xs text-txt-sub mt-1 leading-relaxed">
                  {isLecturer
                    ? "Announcements published in Lecturer mode are immediately marked as Verified and update the course timeline."
                    : "Paste a forwarded WhatsApp message, class rep note, or venue change below. It will be held in the verification queue until confirmed by the course lecturer."}
                </p>
              </div>

              <form onSubmit={handleSubmitUpdate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="course-select"
                      className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1"
                    >
                      Course Unit
                    </label>
                    <select
                      id="course-select"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle text-txt-main focus:border-border-strong focus:outline-none"
                    >
                      {MOCK_UNITS.map((u) => (
                        <option key={u.id} value={u.code}>
                          {u.code} — {u.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="claim-title"
                      className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1"
                    >
                      Summary Title
                    </label>
                    <input
                      id="claim-title"
                      type="text"
                      value={claimTitle}
                      onChange={(e) => setClaimTitle(e.target.value)}
                      placeholder="e.g. Tutorial room change or CAT date"
                      className="w-full h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle text-txt-main focus:border-border-strong focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="source-message"
                    className="block text-[11px] font-mono-code uppercase text-txt-muted mb-1"
                  >
                    Original Message / Announcement Text
                  </label>
                  <textarea
                    id="source-message"
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Paste the exact course announcement or class message here..."
                    className="w-full p-3 rounded text-xs bg-surface-2 border border-border-subtle text-txt-main focus:border-border-strong focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
                  <span className="text-[11px] text-txt-muted flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald" />
                    <span>
                      {isLecturer
                        ? "Will be signed by Dr. J. Kimani"
                        : "Scoped to your enrolled courses"}
                    </span>
                  </span>

                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="h-8 px-4 rounded text-xs font-medium bg-txt-main text-canvas hover:opacity-90 disabled:opacity-40 transition-opacity"
                  >
                    {isLecturer
                      ? "Publish Verified Update"
                      : "Submit for Verification"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

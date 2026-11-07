"use client";

import { useState, FormEvent } from "react";
import { Sparkles, Send, CheckCircle2, BookOpen, ShieldAlert } from "lucide-react";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  text: string;
  citation?: string;
}

const SUGGESTIONS = [
  "What is due this week?",
  "When is my next CAT?",
  "Show recent confirmed venue changes",
  "Are there any unverified updates?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  function ask(question: string) {
    const text = question.trim();
    if (!text) return;
    const next = messages.length + 1;
    const lower = text.toLowerCase();

    let replyText =
      "You have 3 upcoming verified commitments: SMA 2104 Assignment 3 due tomorrow at 11:59 PM, ICS 2105 CAT 2 on Monday at 10:00 AM in LT 2, and SMA 2101 CAT 1 on Tuesday at 9:00 AM.";
    let citation = "Verified Course Schedule • SMA 2104, ICS 2105, SMA 2101";

    if (lower.includes("cat")) {
      replyText =
        "Your next confirmed CATs are: (1) ICS 2105 Data Structures CAT 2 on Monday, Nov 9 at 10:00 AM in LT 2, and (2) SMA 2101 Calculus I CAT 1 on Tuesday, Nov 10 at 9:00 AM in Lecture Theatre 2.";
      citation = "Confirmed Department Timetable • ICS 2105 & SMA 2101";
    } else if (lower.includes("change") || lower.includes("venue")) {
      replyText =
        "Dr. J. Kimani confirmed that the SMA 2104 Linear Algebra problem session has moved from LT-01 to Room PAM-302 starting this Tuesday at 2:00 PM.";
      citation = "Official Lecturer Announcement • SMA 2104 (Verified)";
    } else if (lower.includes("unverified") || lower.includes("pending")) {
      replyText =
        "There is 1 class-rep proposal in ICS 2105 requesting to move CAT 2 to Friday afternoon. This is currently marked 'Pending review' and has NOT been confirmed by Dr. Njeri Kamau.";
      citation = "Course Verification Queue • Claim #clm-102 (Unverified)";
    }

    setMessages((prev) => [
      ...prev,
      { id: next, role: "user", text },
      { id: next + 1, role: "assistant", text: replyText, citation },
    ]);
    setInput("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ask(input);
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-1 select-none overflow-hidden">
      {/* Header */}
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-amber-surface border border-amber/30 flex items-center justify-center text-amber">
            <Sparkles size={16} />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-txt-main">
              Okoa Academic Coordination Assistant
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              Answers strictly grounded in verified course announcements and syllabi
            </p>
          </div>
        </div>
        <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-surface-2 border border-border-subtle text-txt-sub">
          Scoped to 4 Enrolled Units
        </span>
      </header>

      {/* Main Layout */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Conversation Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div
            aria-live="polite"
            className="flex-1 overflow-y-auto p-6 bg-canvas/30 space-y-4"
          >
            {messages.length === 0 ? (
              <div className="max-w-xl mx-auto my-8 p-6 rounded-lg bg-surface-1 border border-border-subtle space-y-4">
                <div className="w-10 h-10 rounded-lg bg-amber-surface border border-amber/30 flex items-center justify-center text-amber">
                  <Sparkles size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-txt-muted">
                    Source-Grounded Academic Q&A
                  </span>
                  <h2 className="font-serif-display text-xl font-semibold text-txt-main">
                    What do you need to clarify about your academic week?
                  </h2>
                  <p className="text-xs text-txt-sub leading-relaxed">
                    Ask about upcoming CATs, assignment requirements, or room
                    changes. Every response cites its source and distinguishes
                    confirmed facts from unverified claims.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => ask(item)}
                      className="p-2.5 rounded-md bg-surface-2 hover:bg-surface-3 border border-border-subtle text-left text-xs font-medium text-txt-main transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((msg) => (
                  <article
                    key={msg.id}
                    className={`p-4 rounded-lg border space-y-2 ${
                      msg.role === "assistant"
                        ? "bg-surface-1 border-border-subtle"
                        : "bg-surface-2 border-border-strong ml-12"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono-code text-txt-muted">
                      <span>
                        {msg.role === "assistant"
                          ? "Okoa Coordination Assistant"
                          : "You"}
                      </span>
                    </div>
                    <p className="text-xs text-txt-main leading-relaxed">
                      {msg.text}
                    </p>
                    {msg.citation && (
                      <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono-code text-emerald">
                        <CheckCircle2 size={12} />
                        <span>{msg.citation}</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-border-subtle bg-surface-1">
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto flex items-center gap-2"
            >
              <label htmlFor="assistant-question" className="sr-only">
                Ask about your courses
              </label>
              <input
                id="assistant-question"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about deadlines, venues, or course announcements..."
                className="flex-1 h-9 px-3 rounded text-xs bg-surface-2 border border-border-subtle focus:border-border-strong focus:outline-none text-txt-main"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-9 px-4 rounded bg-txt-main text-canvas text-xs font-medium flex items-center gap-1.5 hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <span>Ask</span>
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Provenance Sidebar */}
        <aside className="w-80 border-l border-border-subtle bg-surface-1 p-5 hidden xl:flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <span className="text-[10px] font-mono-code uppercase tracking-wider text-txt-muted font-semibold block">
              Verification Guardrails
            </span>
            <h3 className="text-xs font-semibold text-txt-main">
              Confirmed Records First
            </h3>
            <p className="text-xs text-txt-sub leading-relaxed">
              Okoa prioritizes lecturer-confirmed announcements and official
              syllabi. Unverified class messages are explicitly flagged so you
              never mistake a rumor for a confirmed deadline.
            </p>

            <div className="space-y-2.5 pt-2 border-t border-border-subtle text-xs text-txt-sub">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald shrink-0" />
                <span>Every answer links to its course source</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-indigo shrink-0" />
                <span>Scoped strictly to enrolled units</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-amber shrink-0" />
                <span>Pending claims never alter official dates</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

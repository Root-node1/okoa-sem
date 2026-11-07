"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_UNITS } from "@/data/mock-units";
import {
  Inbox,
  AlertCircle,
  Archive,
  ChevronDown,
  Hash,
  Plus,
  Compass,
} from "lucide-react";

export function SidebarNav() {
  const params = useParams();
  const currentUnitId = params.unitId as string;

  return (
    <div className="flex flex-col h-full bg-surface-1 select-none">
      {/* Workspace Switcher / Unit Header */}
      <div className="h-14 px-3.5 border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <div className="w-6 h-6 rounded bg-surface-2 border border-border-strong flex items-center justify-center text-[10px] font-mono-code font-bold">
            JK
          </div>
          <div className="truncate">
            <h2 className="text-xs font-semibold tracking-tight text-txt-main truncate leading-tight">
              Pure & Applied Maths
            </h2>
            <p className="text-[10px] font-mono-code text-txt-muted truncate">
              First Year • 2026/27
            </p>
          </div>
        </div>
        <button className="p-1 text-txt-muted hover:text-txt-main hover:bg-surface-2 rounded transition-colors">
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
        {/* Priority Triage Views */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1.5">
            <span className="text-[10px] font-mono-code font-semibold uppercase tracking-wider text-txt-muted">
              Triage Queues
            </span>
          </div>
          <div className="space-y-0.5">
            <Link
              href="/reviews"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium text-txt-main bg-surface-2 border border-border-subtle"
            >
              <div className="flex items-center gap-2">
                <Inbox size={14} className="text-amber" />
                <span>Inbox Review</span>
              </div>
              <span className="font-mono-code text-[11px] font-semibold text-txt-sub">
                13
              </span>
            </Link>

            <Link
              href="/flagged"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-txt-sub hover:text-txt-main hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="text-crimson" />
                <span>Flagged Doubts</span>
              </div>
              <span className="font-mono-code text-[11px] text-crimson font-medium">
                2
              </span>
            </Link>

            <Link
              href="/archive"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-txt-sub hover:text-txt-main hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Archive size={14} className="text-txt-muted" />
                <span>Resolved Archive</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Enrolled Courses / Units */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1.5">
            <span className="text-[10px] font-mono-code font-semibold uppercase tracking-wider text-txt-muted">
              Course Units
            </span>
            <button className="text-txt-muted hover:text-txt-main p-0.5 rounded">
              <Plus size={13} />
            </button>
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

        {/* Department Links */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1.5">
            <span className="text-[10px] font-mono-code font-semibold uppercase tracking-wider text-txt-muted">
              Hub Resources
            </span>
          </div>
          <div className="space-y-0.5">
            <a
              href="https://mcs-all.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-txt-sub hover:text-txt-main hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-txt-muted" />
                <span>MCS Syllabus Hub</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { workspaceService } from "@/services/workspace-service";
import { Inbox, ArrowUpDown, ChevronRight, Clock } from "lucide-react";

export default async function ReviewsPage() {
  const queueItems = await workspaceService.getAllQueueItems();

  return (
    <div className="flex flex-col flex-1 h-full bg-surface-1 select-none overflow-hidden">
      {/* Header */}
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-border-strong flex items-center justify-center text-amber">
            <Inbox size={16} />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-txt-main">
              Triage & Grading Inbox
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              {queueItems.length} active submissions across all enrolled units
            </p>
          </div>
        </div>

        <button className="h-7 px-2.5 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle flex items-center gap-1.5 transition-colors">
          <ArrowUpDown size={13} />
          <span>Sort by Priority</span>
        </button>
      </header>

      {/* Triage List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border-subtle p-6 bg-canvas/30">
        <div className="max-w-4xl mx-auto space-y-3">
          {queueItems.map((item) => (
            <Link
              key={item.id}
              href={`/units/${item.unitId}/${item.id}`}
              className="block p-4 rounded-lg bg-surface-1 border border-border-subtle hover:border-border-strong transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-[11px] font-semibold text-txt-muted px-1.5 py-0.5 rounded bg-surface-2">
                    {item.unitCode}
                  </span>
                  <span className="font-medium text-txt-main">
                    {item.student.name}
                  </span>
                  <span className="font-mono-code text-[10px] text-txt-muted">
                    {item.student.regNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono-code text-[10px] text-txt-muted">
                  <Clock size={12} />
                  <span>{item.createdAt}</span>
                </div>
              </div>

              <h2 className="text-xs font-semibold text-txt-main mb-1">
                {item.title}
              </h2>
              <p className="text-xs text-txt-sub line-clamp-2 leading-relaxed mb-3">
                {item.snippet}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-[11px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold uppercase ${
                      item.priority === "URGENT"
                        ? "bg-crimson-surface text-crimson"
                        : item.priority === "HIGH"
                        ? "bg-amber-surface text-amber"
                        : "bg-surface-3 text-txt-sub"
                    }`}
                  >
                    {item.priority}
                  </span>
                  <span className="font-mono-code text-[10px] text-txt-muted">
                    Status: {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-txt-muted font-medium hover:text-txt-main transition-colors text-xs">
                  <span>Open Thread</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

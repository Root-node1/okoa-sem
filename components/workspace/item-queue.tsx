import Link from "next/link";
import { workspaceService } from "@/services/workspace-service";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface ItemQueueProps {
  unitId: string;
  activeItemId?: string;
}

export async function ItemQueue({ unitId, activeItemId }: ItemQueueProps) {
  const items = await workspaceService.getQueueByUnit(unitId);
  const currentUnit = await workspaceService.getUnitById(unitId);

  return (
    <div className="flex flex-col h-full bg-surface-1 border-r border-border-subtle select-none">
      {/* Header bar matching the inbox reference */}
      <div className="h-14 px-4 border-b border-border-subtle flex items-center justify-between bg-surface-1">
        <div>
          <h2 className="text-xs font-semibold text-txt-main uppercase tracking-wider">
            {currentUnit?.code || "Unit Submissions"}
          </h2>
          <span className="text-[11px] font-mono-code text-txt-muted">
            {items.length} active threads
          </span>
        </div>

        <button className="p-1.5 rounded text-txt-muted hover:text-txt-main hover:bg-surface-2 transition-colors">
          <ArrowUpDown size={14} />
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-2.5 border-b border-border-subtle bg-surface-2/40">
        <div className="relative mb-2">
          <Search
            size={13}
            className="absolute left-2.5 top-2.5 text-txt-muted"
          />
          <input
            type="text"
            placeholder="Search proof, theorem, or student..."
            className="w-full h-8 pl-8 pr-3 text-xs bg-surface-1 rounded border border-border-subtle focus:border-border-strong focus:outline-none placeholder:text-txt-muted text-txt-main"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-txt-muted px-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber" />
            <span>Needs Review</span>
          </div>
          <button className="flex items-center gap-1 hover:text-txt-main transition-colors">
            <SlidersHorizontal size={11} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Item Card Feed */}
      <div className="flex-1 overflow-y-auto divide-y divide-border-subtle">
        {items.map((item) => {
          const isActive = activeItemId === item.id;

          return (
            <Link
              key={item.id}
              href={`/units/${unitId}/${item.id}`}
              className={`block p-3.5 transition-colors relative group ${
                isActive ? "bg-surface-2" : "bg-surface-1 hover:bg-surface-2/60"
              }`}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-txt-main" />
              )}

              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-medium text-txt-main truncate pr-2">
                  {item.student.name}
                </span>
                <span className="font-mono-code text-[10px] text-txt-muted shrink-0">
                  {item.createdAt}
                </span>
              </div>

              <h3 className="text-xs font-medium text-txt-main truncate mb-1">
                {item.title}
              </h3>

              <p className="text-[11px] text-txt-sub line-clamp-2 leading-relaxed">
                {item.snippet}
              </p>

              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="h-4 px-1.5 rounded text-[9px] font-mono-code uppercase font-semibold bg-surface-3 text-txt-muted">
                  {item.student.regNumber}
                </span>

                {item.priority === "HIGH" && (
                  <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-amber-surface text-amber">
                    High
                  </span>
                )}
                {item.priority === "URGENT" && (
                  <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-crimson-surface text-crimson">
                    Urgent
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import Link from "next/link";
import { workspaceService } from "@/services/workspace-service";
import { BookOpen, ChevronRight, Users, AlertCircle } from "lucide-react";

export default async function UnitsPage() {
  const units = await workspaceService.getUnits();

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-1 select-none overflow-hidden">
      {/* Header */}
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-border-strong flex items-center justify-center text-txt-main">
            <BookOpen size={16} />
          </div>
          <div>
            <h1 className="text-xs font-semibold text-txt-main">
              Enrolled Course Units
            </h1>
            <p className="text-[10px] font-mono-code text-txt-muted">
              {units.length} active modules for First Year • Semester 2
            </p>
          </div>
        </div>
      </header>

      {/* Course Directory Grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-canvas/30">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {units.map((unit) => (
              <Link
                key={unit.id}
                href={`/units/${unit.id}`}
                className="p-5 rounded-lg bg-surface-1 border border-border-subtle hover:border-border-strong transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-code text-xs font-bold text-txt-main px-2 py-0.5 rounded bg-surface-2 border border-border-subtle">
                      {unit.code}
                    </span>
                    {unit.unreadCount > 0 ? (
                      <span className="font-mono-code text-[10px] text-amber font-semibold bg-amber-surface px-2 py-0.5 rounded flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>{unit.unreadCount} updates</span>
                      </span>
                    ) : (
                      <span className="font-mono-code text-[10px] text-txt-muted">
                        Up to date
                      </span>
                    )}
                  </div>

                  <h2 className="text-sm font-semibold text-txt-main group-hover:text-txt-main transition-colors mb-1">
                    {unit.name}
                  </h2>
                  <p className="text-xs text-txt-muted">
                    Department of Pure & Applied Mathematics
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-xs text-txt-sub">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-code text-[11px] text-txt-muted flex items-center gap-1">
                      <Users size={12} />
                      <span>{unit.totalSubmissions} students</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-medium text-txt-main group-hover:translate-x-0.5 transition-transform">
                    <span>Enter Workspace</span>
                    <ChevronRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

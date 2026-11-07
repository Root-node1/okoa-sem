import Link from "next/link";
import { notFound } from "next/navigation";
import { workspaceService } from "@/services/workspace-service";
import { ItemQueue } from "@/components/workspace/item-queue";
import {
  CheckCircle2,
  Paperclip,
  Send,
  MoreHorizontal,
  ChevronRight,
  Code2,
  FileText,
} from "lucide-react";

interface ItemPageProps {
  params: Promise<{ unitId: string; itemId: string }>;
}

export async function generateStaticParams() {
  const items = await workspaceService.getAllQueueItems();
  return items.map((item) => ({
    unitId: item.unitId,
    itemId: item.id,
  }));
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { unitId, itemId } = await params;
  const item = await workspaceService.getItemById(itemId);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Layer 2: Focused Submission Queue for this Unit */}
      <aside className="w-80 flex-shrink-0 h-full hidden lg:flex flex-col">
        <ItemQueue unitId={unitId} activeItemId={itemId} />
      </aside>

      {/* Center Canvas: Active Conversation & Code Discussion */}
      <div className="flex-1 flex flex-col h-full bg-surface-1 border-r border-border-subtle">
        {/* Workspace Canvas Header */}
        <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
          <div className="flex items-center gap-2.5 truncate">
            <Link
              href={`/units/${unitId}`}
              className="font-mono-code text-xs text-txt-muted hover:text-txt-main transition-colors"
            >
              {item.unitCode}
            </Link>
            <ChevronRight size={13} className="text-txt-muted" />
            <h1 className="text-xs font-semibold text-txt-main truncate">
              {item.title}
            </h1>
            <span className="h-4 px-1.5 rounded text-[9px] font-mono-code font-semibold bg-surface-2 border border-border-subtle text-txt-sub">
              {item.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="h-7 px-2.5 rounded text-xs font-medium bg-surface-2 hover:bg-surface-3 text-txt-main border border-border-subtle flex items-center gap-1.5 transition-colors">
              <CheckCircle2 size={13} className="text-emerald" />
              <span>Mark Resolved</span>
            </button>
            <button className="p-1 rounded text-txt-muted hover:text-txt-main hover:bg-surface-2 transition-colors">
              <MoreHorizontal size={15} />
            </button>
          </div>
        </header>

        {/* Threaded Discussion / Work Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-canvas/30">
          {/* Student Question Card */}
          <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-surface-2 border border-border-strong flex items-center justify-center text-[10px] font-mono-code font-bold">
                  {item.student.name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-semibold text-txt-main">
                    {item.student.name}
                  </span>
                  <span className="font-mono-code text-[10px] text-txt-muted ml-2">
                    {item.student.regNumber}
                  </span>
                </div>
              </div>
              <span className="font-mono-code text-[10px] text-txt-muted">
                {item.createdAt}
              </span>
            </div>

            <p className="text-xs text-txt-main leading-relaxed">
              {item.snippet}
            </p>

            <div className="p-3 bg-surface-2 rounded-md border border-border-subtle font-mono-code text-xs text-txt-main">
              <code>{`# Characteristic Equation:\ndet(A - \\lambda I) = 0 \n\\lambda_1 = 2, \\lambda_2 = 2, \\lambda_3 = 5`}</code>
            </div>
          </div>

          {/* Lecturer Response Simulation Card */}
          <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle space-y-3 ml-6 border-l-2 border-l-txt-main">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-txt-main text-canvas flex items-center justify-center text-[10px] font-mono-code font-bold">
                  L
                </div>
                <div>
                  <span className="text-xs font-semibold text-txt-main">
                    Faculty Reviewer
                  </span>
                  <span className="text-[10px] font-mono-code text-txt-muted ml-2">
                    Department of PAM
                  </span>
                </div>
              </div>
              <span className="font-mono-code text-[10px] text-txt-muted">
                10:32 AM
              </span>
            </div>

            <p className="text-xs text-txt-main leading-relaxed">
              Check the dimension of the eigenspace $E_2 = \ker(A - 2I)$. When
              row-reducing $(A - 2I)$, verify if you obtain one or two free
              variables. If there is only one free variable, the geometric
              multiplicity is 1, making the matrix non-diagonalizable.
            </p>
          </div>
        </div>

        {/* Bottom Interaction Area */}
        <div className="p-4 border-t border-border-subtle bg-surface-1">
          <div className="border border-border-subtle rounded-md overflow-hidden bg-surface-2/60 focus-within:border-border-strong focus-within:bg-surface-1 transition-all">
            <textarea
              rows={3}
              placeholder="Provide mathematical feedback or code review (Markdown & LaTeX supported)..."
              className="w-full p-3 text-xs bg-transparent focus:outline-none placeholder:text-txt-muted resize-none text-txt-main font-sans"
            />
            <div className="flex items-center justify-between px-3 py-2 border-t border-border-subtle bg-surface-1">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Attach notebook / script"
                  className="p-1 text-txt-muted hover:text-txt-main rounded transition-colors"
                >
                  <Paperclip size={13} />
                </button>
                <button
                  type="button"
                  title="Insert code block"
                  className="p-1 text-txt-muted hover:text-txt-main rounded transition-colors"
                >
                  <Code2 size={13} />
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono-code text-txt-muted">
                  Cmd + Enter
                </span>
                <button
                  type="button"
                  className="h-7 px-3 rounded bg-txt-main text-canvas text-xs font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <span>Reply</span>
                  <Send size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3 Extension: Metadata & Rubric Drawer (300px) */}
      <aside className="w-72 lg:w-80 flex-shrink-0 bg-surface-1 hidden xl:flex flex-col justify-between border-l border-border-subtle select-none">
        <div className="p-4 space-y-5">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-txt-muted">
              Metadata & Attributes
            </h4>
            <span className="font-mono-code text-[10px] text-txt-muted">
              #{item.id}
            </span>
          </div>

          {/* Student Profile Specs */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-txt-muted block text-[10px] font-mono-code uppercase">
                Learner
              </span>
              <span className="font-medium text-txt-main">
                {item.student.name}
              </span>
            </div>
            <div>
              <span className="text-txt-muted block text-[10px] font-mono-code uppercase">
                Reg Identifier
              </span>
              <span className="font-mono-code text-txt-main">
                {item.student.regNumber}
              </span>
            </div>
            <div>
              <span className="text-txt-muted block text-[10px] font-mono-code uppercase">
                Current Unit
              </span>
              <span className="font-medium text-txt-main">{item.unitCode}</span>
            </div>
            <div>
              <span className="text-txt-muted block text-[10px] font-mono-code uppercase">
                Status
              </span>
              <span className="font-mono-code text-[11px] text-amber font-semibold">
                {item.status}
              </span>
            </div>
          </div>

          {/* Evaluator Rubric Component */}
          {item.rubricSummary && (
            <div className="pt-4 border-t border-border-subtle space-y-2.5">
              <h5 className="text-[11px] font-semibold text-txt-main">
                Criterion Breakdown
              </h5>
              <div className="space-y-2">
                {item.rubricSummary.map((rubric) => (
                  <div key={rubric.criterion} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-txt-sub">{rubric.criterion}</span>
                      <span className="font-mono-code font-semibold text-txt-main">
                        {rubric.score}/{rubric.maxScore}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden border border-border-subtle">
                      <div
                        className="h-full bg-txt-main rounded-full"
                        style={{
                          width: `${(rubric.score / rubric.maxScore) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Action Footer */}
        <div className="p-4 border-t border-border-subtle space-y-2 bg-surface-2/30">
          <button className="w-full h-8 text-xs font-medium rounded border border-border-strong bg-surface-1 text-txt-main hover:bg-surface-2 flex items-center justify-center gap-1.5 transition-colors">
            <FileText size={13} />
            <span>Generate Marksheet Export</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

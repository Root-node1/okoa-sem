import { notFound } from "next/navigation";
import { workspaceService } from "@/services/workspace-service";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MoreHorizontal } from "lucide-react";

interface SubmissionReviewPageProps {
  params: Promise<{ submissionId: string }>;
}

export async function generateStaticParams() {
  const items = await workspaceService.getAllQueueItems();
  return items.map((item) => ({ submissionId: item.id }));
}

export default async function SubmissionReviewPage({
  params,
}: SubmissionReviewPageProps) {
  const { submissionId } = await params;
  const item = await workspaceService.getItemById(submissionId);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-surface-1 select-none overflow-hidden">
      <header className="h-14 px-6 border-b border-border-subtle flex items-center justify-between bg-surface-1 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/reviews"
            className="p-1 rounded text-txt-muted hover:text-txt-main hover:bg-surface-2 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs text-txt-muted">
              {item.unitCode}
            </span>
            <span className="text-xs font-semibold text-txt-main">
              {item.title}
            </span>
          </div>
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

      <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full space-y-4">
        <div className="p-4 rounded-lg bg-surface-1 border border-border-subtle space-y-3">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-surface-2 border border-border-strong flex items-center justify-center text-[10px] font-mono-code font-bold">
                {item.student.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-txt-main">
                {item.student.name}
              </span>
              <span className="font-mono-code text-[10px] text-txt-muted">
                {item.student.regNumber}
              </span>
            </div>
            <span className="font-mono-code text-[10px] text-txt-muted">
              {item.createdAt}
            </span>
          </div>
          <p className="text-xs text-txt-main leading-relaxed">{item.snippet}</p>
        </div>
      </div>
    </div>
  );
}

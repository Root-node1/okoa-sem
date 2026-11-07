import { ReactNode, Suspense } from "react";
import { ItemQueue } from "@/components/workspace/item-queue";
import { workspaceService } from "@/services/workspace-service";

interface UnitLayoutProps {
  children: ReactNode;
  params: Promise<{ unitId: string }>;
}

export async function generateStaticParams() {
  const units = await workspaceService.getUnits();
  return units.map((u) => ({ unitId: u.id }));
}

export default async function UnitLayout({
  children,
  params,
}: UnitLayoutProps) {
  const { unitId } = await params;

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Layer 2: Master Queue (320px) */}
      <aside className="w-80 flex-shrink-0 h-full hidden md:flex flex-col">
        <Suspense fallback={<div className="flex-1 bg-surface-1 border-r border-border-subtle" />}>
          <ItemQueue unitId={unitId} />
        </Suspense>
      </aside>

      {/* Layer 3: Focus Workspace */}
      <main className="flex flex-1 h-full overflow-hidden flex flex-col">
        <Suspense fallback={<div className="flex-1 bg-canvas" />}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}

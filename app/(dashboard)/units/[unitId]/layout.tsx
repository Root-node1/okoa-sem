import { ReactNode, Suspense } from "react";
import { workspaceService } from "@/services/workspace-service";

interface UnitLayoutProps {
  children: ReactNode;
  params: Promise<{ unitId: string }>;
}

export async function generateStaticParams() {
  const units = await workspaceService.getUnits();
  return units.map((u) => ({ unitId: u.id }));
}

export default async function UnitLayout({ children }: UnitLayoutProps) {
  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <Suspense fallback={<div className="flex-1 bg-canvas" />}>
        {children}
      </Suspense>
    </div>
  );
}

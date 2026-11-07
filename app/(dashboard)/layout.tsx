import { ReactNode, Suspense } from "react";
import { IconRail } from "@/components/layout/icon-rail";
import { SidebarNav } from "@/components/layout/sidebar-nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas">
      {/* Layer 0: Global Icon Rail */}
      <Suspense
        fallback={
          <aside className="w-16 h-full flex-shrink-0 bg-surface-1 border-r border-border-subtle" />
        }
      >
        <IconRail />
      </Suspense>

      {/* Layer 1: Context Navigation Sidebar */}
      <aside className="w-60 h-full flex-shrink-0 border-r border-border-subtle bg-surface-1 hidden md:flex flex-col z-20">
        <Suspense fallback={<div className="flex-1 bg-surface-1" />}>
          <SidebarNav />
        </Suspense>
      </aside>

      {/* Layers 2 & 3: Master Queue & Detail Focus Workspace */}
      <div className="flex flex-1 h-full overflow-hidden">
        <Suspense fallback={<div className="flex-1 bg-canvas" />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}

import { ReactNode } from "react";
import { IconRail } from "@/components/layout/icon-rail";
import { SidebarNav } from "@/components/layout/sidebar-nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas">
      {/* Layer 0: Global Icon Rail */}
      <IconRail />

      {/* Layer 1: Context Navigation Sidebar */}
      <aside className="w-60 h-full flex-shrink-0 border-r border-border-subtle bg-surface-1 hidden md:flex flex-col z-20">
        <SidebarNav />
      </aside>

      {/* Layers 2 & 3: Master Queue & Detail Focus Workspace */}
      <div className="flex flex-1 h-full overflow-hidden">{children}</div>
    </div>
  );
}

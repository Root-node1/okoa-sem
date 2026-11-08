import { notFound } from "next/navigation";
import { workspaceService } from "@/services/workspace-service";
import { CourseWorkspaceTabs } from "@/components/workspace/course-workspace-tabs";

interface UnitPageProps {
  params: Promise<{ unitId: string }>;
}

export async function generateStaticParams() {
  const units = await workspaceService.getUnits();
  return units.map((u) => ({ unitId: u.id }));
}

export default async function UnitWorkspacePage({ params }: UnitPageProps) {
  const { unitId } = await params;
  const unit = await workspaceService.getUnitById(unitId);

  if (!unit) {
    notFound();
  }

  const [events, materials, assignments, threads] = await Promise.all([
    workspaceService.getEventsByUnit(unitId),
    workspaceService.getMaterialsByUnit(unitId),
    workspaceService.getAssignmentsByUnit(unitId),
    workspaceService.getQueueByUnit(unitId),
  ]);

  return (
    <CourseWorkspaceTabs
      unit={unit}
      events={events}
      materials={materials}
      assignments={assignments}
      threads={threads}
    />
  );
}

import { MOCK_UNITS } from "@/data/mock-units";
import { MOCK_QUEUE_ITEMS } from "@/data/mock-queue-items";
import {
  MOCK_EVENTS,
  MOCK_CLAIMS,
  MOCK_ASSIGNMENTS,
  MOCK_MATERIALS,
  MOCK_NOTIFICATIONS,
} from "@/data/mock-academic-data";
import {
  QueueItem,
  UnitModule,
  AcademicEvent,
  Claim,
  AssignmentTask,
  CourseMaterial,
  AcademicNotification,
} from "@/types/workspace";

export const workspaceService = {
  async getUnits(): Promise<UnitModule[]> {
    return [...MOCK_UNITS];
  },

  async getUnitById(unitId: string): Promise<UnitModule | null> {
    return MOCK_UNITS.find((u) => u.id === unitId) || null;
  },

  async getQueueByUnit(unitId: string): Promise<QueueItem[]> {
    return MOCK_QUEUE_ITEMS.filter((item) => item.unitId === unitId);
  },

  async getAllQueueItems(): Promise<QueueItem[]> {
    return [...MOCK_QUEUE_ITEMS];
  },

  async getItemById(itemId: string): Promise<QueueItem | null> {
    return MOCK_QUEUE_ITEMS.find((item) => item.id === itemId) || null;
  },

  async getEventsByUnit(unitId: string): Promise<AcademicEvent[]> {
    return MOCK_EVENTS.filter((evt) => evt.unitId === unitId);
  },

  async getAllEvents(): Promise<AcademicEvent[]> {
    return [...MOCK_EVENTS];
  },

  async getClaims(): Promise<Claim[]> {
    return [...MOCK_CLAIMS];
  },

  async getAssignmentsByUnit(unitId: string): Promise<AssignmentTask[]> {
    return MOCK_ASSIGNMENTS.filter((asg) => asg.unitId === unitId);
  },

  async getAllAssignments(): Promise<AssignmentTask[]> {
    return [...MOCK_ASSIGNMENTS];
  },

  async getMaterialsByUnit(unitId: string): Promise<CourseMaterial[]> {
    return MOCK_MATERIALS.filter((mat) => mat.unitId === unitId);
  },

  async getNotifications(): Promise<AcademicNotification[]> {
    return [...MOCK_NOTIFICATIONS];
  },
};

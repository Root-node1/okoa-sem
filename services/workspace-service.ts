import { MOCK_UNITS } from "@/data/mock-units";
import { MOCK_QUEUE_ITEMS } from "@/data/mock-queue-items";
import { QueueItem, UnitModule } from "@/types/workspace";

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
};

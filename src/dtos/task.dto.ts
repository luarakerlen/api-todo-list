import { TaskStatus } from "@prisma/client";

export interface ListTasksDto {
  userId: string;
  filters?: {
    title?: string;
    status?: TaskStatus;
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}

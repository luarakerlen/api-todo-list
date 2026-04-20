import { TaskStatus } from "@prisma/client";

export interface CreateTaskDto {
  userId: string;
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskDto {
  taskId: string;
  userId: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface ListTasksDto {
  userId: string;
  filters?: {
    title?: string;
    status?: TaskStatus;
  };
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

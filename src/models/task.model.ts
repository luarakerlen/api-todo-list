import { TaskStatus } from "@prisma/client";

export interface TaskDto {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
}

export class Task {
  constructor(
    private id: string,
    private title: string,
    private status: TaskStatus,
    private createdAt: Date,
    private updatedAt: Date,
    private description?: string,
  ) { }

  public toJSON(): TaskDto {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
    };
  }
}

import prismaRepository from "../database/prisma.repository";
import { Task as TaskEntity } from "@prisma/client";
import { Task } from "../models";
import { ListTasksDto } from "../dtos";

export class TaskService {

  constructor() { }

  public async listTasks({ userId, filters }: ListTasksDto): Promise<Task[]> {
    const where: any = {};

    if (filters?.title) {
      where.title = {
        contains: filters.title,
        mode: "insensitive",
      };
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    const tasks = await prismaRepository.task.findMany({
      where: {
        userId,
        ...where,
      }
    })

    return tasks.map((task) => this.mapToModel(task));
  }

  private mapToModel(entity: TaskEntity): Task {
    return new Task(
      entity.id,
      entity.title,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
      entity.description ?? undefined,
    );
  }
}

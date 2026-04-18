import prismaRepository from "../database/prisma.repository";
import { Task as TaskEntity } from "@prisma/client";
import { Task } from "../models";
import { ListTasksDto } from "../dtos";
import { PaginatedResponse } from "../shared/types";

export class TaskService {

  constructor() { }

  /**
   * Lista as tasks com filtros opcionais e paginação.
   * 
   * @param params Objeto contendo userId, filtros opcionais e  opções de paginação.
   * @param params.userId Retorna apenas as tasks pertencentes a esse usuário.
   * @param params.title Filtra pelo título (busca parcial, case insensitive).
   * @param params.status Filtra pelo status da task.
   * @param params.page Número da página (padrão: 1).
   * @param params.pageSize Quantidade de itens por página (padrão: 10).
   * 
   * @returns Uma resposta paginada contendo as tasks do usuário especificado.
   */
  public async listTasks({ userId, filters, pagination }: ListTasksDto): Promise<PaginatedResponse<Task>> {
    /* Filters */
    const where: any = { userId };

    if (filters?.title) {
      where.title = {
        contains: filters.title,
        mode: "insensitive",
      };
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    /* Pagination */
    const page = pagination?.page ?? 1;
    const pageSize = pagination?.pageSize ?? 10;

    const totalTasks = await prismaRepository.task.count({ where });

    /* Fetching data */
    const tasks = await prismaRepository.task.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      }
    })

    const data = tasks.map((task) => this.mapToModel(task));

    return {
      data,
      meta: {
        page,
        pageSize,
        total: totalTasks,
        totalPages: Math.ceil(totalTasks / pageSize),
      }
    }
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

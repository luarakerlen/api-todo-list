import prismaRepository from "../database/prisma.repository";
import { Task as TaskEntity } from "@prisma/client";
import { Task } from "../models";
import { CreateTaskDto, UpdateTaskDto, ListTasksDto } from "../dtos";
import { PaginatedResponse } from "../shared/types";
import { HTTPError } from "../utils";

export class TaskService {

  constructor() { }

  /**
   * Cria uma nova task para o usuário especificado.
   * 
   * @param param Objeto contendo os dados da task a ser criada.
   * @param param.userId ID do usuário proprietário da task.
   * @param param.title Título da task.
   * @param param.description Descrição da task (opcional).
   * @param param.status Status da task (opcional, padrão: pending).
   * 
   * @returns A task criada, mapeada para o modelo Task.
   */
  public async createTask({ userId, title, description, status }: CreateTaskDto): Promise<Task> {
    const newTask = await prismaRepository.task.create({
      data: {
        userId,
        title,
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
      }
    });

    return this.mapToModel(newTask);
  }

  /**
   * Lista as tasks com filtros opcionais e paginação.
   * 
   * @param params Objeto contendo userId, filtros opcionais e  opções de paginação.
   * @param params.userId Retorna apenas as tasks pertencentes a esse usuário.
   * @param params.filters.title Filtra pelo título (busca parcial, case insensitive).
   * @param params.filters.status Filtra pelo status da task.
   * @param params.pagination.page Número da página (padrão: 1).
   * @param params.pagination.pageSize Quantidade de itens por página (padrão: 10).
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

  /**
   * Busca uma task pelo ID, garantindo que ela pertença ao usuário especificado.
   * 
   * @param taskId ID da task a ser buscada.
   * @param userId ID do usuário proprietário da task.
   * 
   * @throws HTTPError se a task não for encontrada ou não pertencer ao usuário.
   * @returns A task encontrada, mapeada para o modelo Task.
   */
  public async getTaskById(taskId: string, userId: string): Promise<Task> {
    const task = await prismaRepository.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== userId) {
      throw new HTTPError(404, "Task not found");
    }

    return this.mapToModel(task);
  }

  /**
   * Atualiza uma task existente, garantindo que ela pertença ao usuário especificado.
   * 
   * @param param Objeto contendo os dados para atualização da task.
   * @param param.taskId ID da task a ser atualizada.
   * @param param.userId ID do usuário proprietário da task.
   * @param param.title Novo título da task (opcional).
   * @param param.description Nova descrição da task (opcional).
   * @param param.status Novo status da task (opcional).
   * 
   * @throws HTTPError se a task não for encontrada, não pertencer ao usuário ou se nenhum campo para atualização for fornecido.
   * @returns A task atualizada, mapeada para o modelo Task.
   */
  public async updateTask({ taskId, userId, title, description, status }: UpdateTaskDto): Promise<Task> {
    const taskToBeUpdated = await this.getTaskById(taskId, userId);

    if (
      title === undefined &&
      description === undefined &&
      status === undefined
    ) {
      throw new HTTPError(400, "No fields to update");
    }

    const updatedTask = await prismaRepository.task.update({
      where: { id: taskToBeUpdated.toJSON().id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
      }
    });

    return this.mapToModel(updatedTask);
  }

  /**
   * Deleta uma task pelo ID, garantindo que ela pertença ao usuário especificado.
   * 
   * @param taskId ID da task a ser deletada.
   * @param userId ID do usuário proprietário da task.
   * 
   * @throws HTTPError se a task não for encontrada ou não pertencer ao usuário.
   * @returns A task deletada, mapeada para o modelo Task.
   */
  public async deleteTask(taskId: string, userId: string): Promise<Task> {
    const taskToBeDeleted = await this.getTaskById(taskId, userId);

    const taskDeleted = await prismaRepository.task.delete({
      where: { id: taskToBeDeleted.toJSON().id },
    });

    return this.mapToModel(taskDeleted);
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

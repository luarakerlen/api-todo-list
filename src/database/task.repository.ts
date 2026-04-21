import { PrismaClient } from "@prisma/client";
import { CreateTaskDto, GetTasksDto, UpdateTaskDto } from "../dtos";

/**
 * Repository responsável por todas as operações de banco relacionadas às Tarefas.
 * 
 * Esta classe abstrai o Prisma e centraliza o acesso à entidade Task,
 * evitando que a camada de Service dependa diretamente do ORM.
 */
export class TaskRepository {
  private prisma = new PrismaClient();

  /**
   * Cria uma nova task para o usuário especificado.
   *
   * @param data Objeto contendo os dados da task a ser criada (userId, title, description, status).
   * @param data.userId ID do usuário proprietário da task.
   * @param data.title Título da task.
   * @param data.description Descrição da task (opcional).
   * @param data.status Status da task (opcional, padrão: pending).
   * 
   * @returns Task criada retornada pelo Prisma
   */
  async createTask(data: CreateTaskDto) {
    return this.prisma.task.create({ data });
  }

  /**
   * Lista as tasks com filtros opcionais e paginação.
   * 
   * @param params Objeto contendo os parâmetros de userId, filtragem e paginação.
   * @param params.where.userId Retorna apenas as tasks pertencentes a esse usuário.
   * @param params.where.title Filtra pelo título (busca parcial, case insensitive).
   * @param params.where.status Filtra pelo status da task.
   * @param params.skip Número de itens a serem ignorados (para paginação).
   * @param params.take Número de itens a serem retornados (para paginação).
   * 
   * @returns Uma resposta paginada contendo as tasks do usuário especificado.
   */
  async listTasks(params: GetTasksDto) {
    return this.prisma.task.findMany({
      ...params,
      orderBy: {
        createdAt: "desc",
      }
    })
  }

  /**
    * Busca uma task pelo ID, garantindo que ela pertença ao usuário especificado.
    * 
    * @param taskId ID da task a ser buscada.
    * @param userId ID do usuário proprietário da task.
    * 
    * @returns A task encontrada.
    */
  public async getTaskById(taskId: string, userId: string) {
    return await this.prisma.task.findUnique({
      where: { id: taskId, userId },
    });
  }

  /**
   * Atualiza uma task existente, garantindo que ela pertença ao usuário especificado.
   * 
   * @param data Objeto contendo os dados para atualização da task.
   * @param data.taskId ID da task a ser atualizada.
   * @param data.userId ID do usuário proprietário da task.
   * @param data.title Novo título da task (opcional).
   * @param data.description Nova descrição da task (opcional).
   * @param data.status Novo status da task (opcional).
   * 
   * @returns A task atualizada.
   */
  public async updateTask({ taskId, userId, ...data }: UpdateTaskDto) {
    return await this.prisma.task.update({
      where: { id: taskId, userId },
      data,
    });
  }

  /**
   * Deleta uma task pelo ID, garantindo que ela pertença ao usuário especificado.
   * 
   * @param taskId ID da task a ser deletada.
   * @param userId ID do usuário proprietário da task.
   * 
   * @returns A task deletada.
   */
  public async deleteTask(taskId: string, userId: string) {
    return await this.prisma.task.delete({
      where: { id: taskId, userId },
    });
  }
}
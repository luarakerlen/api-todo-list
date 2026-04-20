
import { Request, Response } from "express";
import { TaskStatus } from "@prisma/client";
import { TaskService } from "../services";
import { onError } from "../utils";

/**
 * Controller responsável por lidar com as requisições relacionadas às tarefas (tasks).
 * Ele recebe as requisições, extrai os dados necessários, chama os métodos do serviço de tarefas (TaskService)
 * e retorna as respostas apropriadas para o cliente.
 *
 * Cada método do controlador corresponde a uma rota específica e é responsável por:
 * - createTask: Criar uma nova tarefa.
 * - listTasks: Listar as tarefas do usuário, com suporte para filtros e paginação.
 * - getTaskById: Obter os detalhes de uma tarefa específica pelo seu ID.
 * - updateTask: Atualizar os dados de uma tarefa existente.
 * - deleteTask: Excluir uma tarefa pelo seu ID.
 *
 * O controlador também lida com erros usando a função onError, garantindo que respostas de erro sejam enviadas
 * de forma consistente para o cliente em caso de falhas.
 */
export class TaskController {
  private taskService = new TaskService();

  public createTask = async (req: Request, res: Response) => {
    try {

      const userLoggedId = req.user.id;
      const taskData = req.body;

      const result = await this.taskService.createTask({
        userId: userLoggedId,
        ...taskData,
      });

      res.status(201).json({
        success: true,
        message: "Tarefa criada com sucesso.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public listTasks = async (req: Request, res: Response) => {
    try {
      const userLoggedId = req.user.id;

      const { title, status, page, pageSize } = req.query;
      const parsedPage = Number(page);
      const parsedPageSize = Number(pageSize);

      const result = await this.taskService.listTasks({
        userId: userLoggedId,
        filters: {
          ...(title && { title: title as string }),
          ...(status && { status: status as TaskStatus }),
        },
        pagination: {
          ...(parsedPage && { page: parsedPage }),
          ...(parsedPageSize && { pageSize: parsedPageSize }),
        },
      });

      res.status(200).json({
        success: true,
        message: "Tarefas listadas com sucesso.",
        data: result.data.map((t) => t.toJSON()),
        meta: result.meta,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public getTaskById = async (req: Request, res: Response) => {
    try {
      const userLoggedId = req.user.id;
      const { id } = req.params;

      const result = await this.taskService.getTaskById(String(id), userLoggedId);

      res.status(200).json({
        success: true,
        message: "Tarefa encontrada com sucesso.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public updateTask = async (req: Request, res: Response) => {
    try {

      const userLoggedId = req.user.id;
      const { id } = req.params;
      const taskData = req.body;

      const result = await this.taskService.updateTask({
        taskId: String(id),
        userId: userLoggedId,
        ...taskData,
      });

      res.status(200).json({
        success: true,
        message: "Tarefa atualizada com sucesso.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public deleteTask = async (req: Request, res: Response) => {
    try {
      const userLoggedId = req.user.id;
      const { id } = req.params;

      const result = await this.taskService.deleteTask(
        String(id),
        userLoggedId
      );

      res.status(200).json({
        success: true,
        message: "Tarefa deletada com sucesso.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }
}

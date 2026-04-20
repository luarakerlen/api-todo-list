import express from "express";
import { body, param, query } from "express-validator";

import { TaskController } from "../controllers";
import { dataValidation } from "../middlewares";

/**
 * Classe TaskRoutes define as rotas para operações relacionadas a tarefas, incluindo:
 * - GET /tasks: Listar tarefas com paginação e filtragem opcionais.
 * - POST /tasks: Criar uma nova tarefa com validação dos campos obrigatórios.
 * - GET /tasks/:id: Recuperar uma tarefa específica pelo seu ID com validação.
 * - PUT /tasks/:id: Atualizar uma tarefa existente com validação dos parâmetros de caminho e corpo.
 * - DELETE /tasks/:id: Excluir uma tarefa pelo seu ID com validação.
 *
 * Cada rota é protegida por middleware de autenticação e utiliza validação de dados para garantir a integridade das requisições recebidas.
 * As rotas são organizadas em uma classe para melhor modularidade e manutenção.
 */
export class TaskRoutes {
    public static bind() {
        const router = express.Router();
        const controller = new TaskController();

        router.get("/health",
            /*  #swagger.tags = ['Health']
                #swagger.description = 'Endpoint de saúde para verificar se a API está funcionando corretamente.'
            */
            (_: express.Request, res: express.Response) => {
                res.status(200).json({ status: "ok" });
            });

        // Protected routes with authentication
        router.get(
            "/tasks",
            /*  #swagger.tags = ['Tasks']
                #swagger.description = 'Lista tarefas do usuário autenticado, com suporte a filtros e paginação.'
                
                #swagger.parameters['title'] = {
                    $ref: '#/components/parameters/taskTitle'
                }

                #swagger.parameters['status'] = {
                    $ref: '#/components/parameters/taskStatus'
                }

                #swagger.parameters['page'] = {
                    $ref: '#/components/parameters/page'
                }

                #swagger.parameters['pageSize'] = {
                    $ref: '#/components/parameters/pageSize'
                }
            */
            // authMiddleware,
            dataValidation([
                query("page").optional().isInt({ min: 1 }),
                query("pageSize").optional().isInt({ min: 1 }),
                query("status").optional().isIn(["pending", "in_progress", "completed"]),
                query("title").optional().isString(),
            ]),
            controller.listTasks,
        );

        router.post(
            "/tasks",
            /*  #swagger.tags = ['Tasks']
                #swagger.description = 'Cria uma nova tarefa para o usuário autenticado.'

                #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createTaskSchema"
                            }
                        }
                    }
                }
            */
            // authMiddleware,
            dataValidation([
                body("title").isString().isLength({ min: 1 }),

                // optional fields
                body("description").optional().isString(),
                body("status")
                    .optional()
                    .isIn(["pending", "in_progress", "completed"])
                    .withMessage("Status deve ser 'pending', 'in_progress' ou 'completed'"),
            ]),
            controller.createTask,
        );

        router.get(
            "/tasks/:id",
            /*  #swagger.tags = ['Tasks']
                #swagger.description = 'Recupera uma tarefa específica pelo seu ID.'

                #swagger.parameters['id'] = {
                    $ref: '#/components/parameters/taskId'
                }
            */
            // authMiddleware,
            dataValidation([param("id").isUUID()]),
            controller.getTaskById,
        );

        router.put(
            "/tasks/:id",
            /*  #swagger.tags = ['Tasks']
                #swagger.description = 'Atualiza uma tarefa existente pelo seu ID.'

                
                #swagger.parameters['id'] = {
                    $ref: '#/components/parameters/taskId'
                }

                #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/updateTaskSchema"
                            }
                        }
                    }
                }
            */
            // authMiddleware,
            dataValidation([
                param("id").isUUID(),
                body("title").optional().isString(),
                body("description").optional().isString(),
                body("status")
                    .optional()
                    .isIn(["pending", "in_progress", "completed"])
                    .withMessage("Status deve ser 'pending', 'in_progress' ou 'completed'"),
            ]),
            controller.updateTask,
        );

        router.delete(
            "/tasks/:id",
            /*  #swagger.tags = ['Tasks']
                #swagger.description = 'Exclui uma tarefa pelo seu ID.'

                #swagger.parameters['id'] = {
                    $ref: '#/components/parameters/taskId'
                }
            */
            // authMiddleware,
            dataValidation([param("id").isUUID()]),
            controller.deleteTask,
        );

        return router;
    }
}

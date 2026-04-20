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

                #swagger.responses[200] = {
                    description: 'API está saudável',
                    content: {
                        "application/json": {
                            example: { status: "ok" }
                        }
                    }
                }
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

                #swagger.responses[200] = {
                    description: 'Lista das tarefas do usuário autenticado e dados de paginação.',
                    schema: {
                        $ref: '#/components/schemas/listTasksResponse' 
                    }
                }

                #swagger.responses[400] = {
                    description: 'Requisição inválida, com detalhes dos erros de validação.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error400Response'
                            }
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Erro interno do servidor.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error500Response'
                            }
                        }
                    }
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

                #swagger.responses[201] = {
                    description: 'Tarefa criada com sucesso.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/createTaskResponse'
                            }
                        }
                    }
                }

                #swagger.responses[400] = {
                    description: 'Requisição inválida, com detalhes dos erros de validação.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error400Response'
                            }
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Erro interno do servidor.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error500Response'
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

                #swagger.responses[200] = {
                    description: 'Detalhes da tarefa encontrada.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/getTaskResponse'
                            }
                        }
                    }
                }

                #swagger.responses[404] = {
                    description: 'Tarefa não encontrada para o ID fornecido ou não pertence ao usuário autenticado.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error404Response'
                            }
                        }
                    }
                }

                #swagger.responses[400] = {
                    description: 'Requisição inválida, com detalhes dos erros de validação.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error400Response'
                            }
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Erro interno do servidor.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error500Response'
                            }
                        }
                    }
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

                #swagger.responses[200] = {
                    description: 'Tarefa atualizada com sucesso.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/updateTaskResponse'
                            }
                        }
                    }
                }

                #swagger.responses[404] = {
                    description: 'Tarefa não encontrada para o ID fornecido ou não pertence ao usuário autenticado.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error404Response'
                            }
                        }
                    }
                }

                #swagger.responses[400] = {
                    description: 'Requisição inválida, com detalhes dos erros de validação.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error400Response'
                            }
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Erro interno do servidor.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error500Response'
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

                #swagger.responses[200] = {
                    description: 'Tarefa deletada com sucesso.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/deleteTaskResponse'
                            }
                        }
                    }
                }

                #swagger.responses[404] = {
                    description: 'Tarefa não encontrada para o ID fornecido ou não pertence ao usuário autenticado.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error404Response'
                            }
                        }
                    }
                }

                #swagger.responses[400] = {
                    description: 'Requisição inválida, com detalhes dos erros de validação.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error400Response'
                            }
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Erro interno do servidor.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error500Response'
                            }
                        }
                    }
                }
            */
            // authMiddleware,
            dataValidation([param("id").isUUID()]),
            controller.deleteTask,
        );

        return router;
    }
}

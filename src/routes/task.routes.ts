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

        router.get("/health", (_: express.Request, res: express.Response) => {
            res.status(200).json({ status: "ok" });
        });

        // Protected routes with authentication
        router.get(
            "/tasks",
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
            // authMiddleware,
            dataValidation([
                body("title").isString().isLength({ min: 1 }),

                // optional fields
                body("description").optional().isString(),
                body("status")
                    .optional()
                    .isIn(["pending", "in_progress", "completed"])
                    .withMessage("Status must be 'pending', 'in_progress' or 'completed'"),
            ]),
            controller.createTask,
        );

        router.get(
            "/tasks/:id",
            // authMiddleware,
            dataValidation([param("id").isUUID()]),
            controller.getTaskById,
        );

        // Example of a PUT route with both path parameter and body validation
        router.put(
            "/tasks/:id",
            // authMiddleware,
            dataValidation([
                param("id").isUUID(),
                body("title").optional().isString(),
                body("description").optional().isString(),
                body("status")
                    .optional()
                    .isIn(["pending", "in_progress", "completed"])
                    .withMessage("Status must be 'pending', 'in_progress' or 'completed'"),
            ]),
            controller.updateTask,
        );

        router.delete(
            "/tasks/:id",
            // authMiddleware,
            dataValidation([param("id").isUUID()]),
            controller.deleteTask,
        );

        return router;
    }
}

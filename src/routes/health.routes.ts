import express from "express";
import { HTTPResponse } from "../utils";

/**
 * Classe HealthRoutes define as rotas para operações relacionadas à saúde da API, incluindo:
 * - GET /health: Verificar se a API está funcionando corretamente.
 */
export class HealthRoutes {
    public static bind() {
        const router = express.Router();

        router.get("/health",
            /*  #swagger.tags = ['Health']
                #swagger.description = 'Endpoint de saúde para verificar se a API está funcionando corretamente.'

                #swagger.security = []

                #swagger.responses[200] = {
                    description: 'API está saudável',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/apiHealthResponse'
                            }
                        }
                    }
                }
            */
            (_: express.Request, res: express.Response) => {
                return HTTPResponse({
                    res,
                    statusCode: 200,
                    message: "A API está saudável.",
                });
            });

        return router;
    }
}

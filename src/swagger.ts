import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API de todo list',
    "description": "API para gerenciar uma lista de tarefas (todo list). A API permite que um usuário cadastrado crie e gerencie suas tarefas, incluindo a criação, leitura, atualização e exclusão de tarefas. Cada tarefa possui um título, descrição, status (pendente, em progresso ou concluída) e uma data de criação. A API é protegida por autenticação JWT, garantindo que apenas usuários autorizados possam acessar e modificar suas tarefas."
  },
  host: 'localhost:3030',
  tags: [
    {
      name: 'Health',
      description: 'Endpoints relacionados à verificação de saúde da API.',
    },
    // {
    //   name: 'Users',
    //   description: 'Endpoints relacionados ao gerenciamento de usuários, incluindo registro, login e atualização de perfil.',
    // },
    // {
    //   name: 'Auth',
    //   description: 'Endpoints relacionados à autenticação, como login e logout.',
    // },
    {
      name: 'Tasks',
      description: 'Endpoints para gerenciamento de tarefas, incluindo criação, leitura, atualização e exclusão de tarefas.',
    }
  ],
  components: {
    Task: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'ID da tarefa',
          example: '123e4567-e89b-12d3-a456-426614174000'
        },
        title: {
          type: 'string',
          description: 'Título da tarefa',
          example: 'Comprar leite'
        },
        description: {
          type: 'string',
          description: 'Descrição detalhada da tarefa',
          example: 'Ir ao supermercado e comprar 2 litros de leite'
        },
        status: {
          '@enum': [
            "pending",
            "in_progress",
            "completed"
          ],
          type: 'string',
          description: 'Status da tarefa',
          example: 'pending'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora de criação da tarefa',
          example: '2024-06-01T12:00:00Z'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora da última atualização da tarefa',
          example: '2024-06-02T15:30:00Z'
        }
      }
    },
    Pagination: {
      type: 'object',
      properties: {
        page: {
          type: 'integer',
          description: 'Número da página atual',
          example: 1
        },
        pageSize: {
          type: 'integer',
          description: 'Número de itens por página',
          example: 10
        },
        total: {
          type: 'integer',
          description: 'Número total de itens disponíveis',
          example: 100
        },
        totalPages: {
          type: 'integer',
          description: 'Número total de páginas disponíveis',
          example: 20
        },
      }
    },
    Error400Response: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Requisição inválida' }
      }
    },
    Error404Response: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Recurso não encontrado' }
      }
    },
    Error500Response: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Internal server error' }
      }
    },
    '@schemas': {
      createTaskSchema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Título da tarefa',
            example: 'Comprar leite'
          },
          description: {
            type: 'string',
            description: 'Descrição detalhada da tarefa',
            example: 'Ir ao supermercado e comprar 2 litros de leite'
          },
          status: {
            '@enum': [
              "pending",
              "in_progress",
              "completed"
            ],
            type: 'string',
            description: 'Status da tarefa',
            example: 'pending'
          }
        },
        required: ['title']
      },
      updateTaskSchema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Título da tarefa',
            example: 'Comprar leite'
          },
          description: {
            type: 'string',
            description: 'Descrição detalhada da tarefa',
            example: 'Ir ao supermercado e comprar 2 litros de leite'
          },
          status: {
            '@enum': [
              "pending",
              "in_progress",
              "completed"
            ],
            type: 'string',
            description: 'Status da tarefa',
            example: 'pending'
          }
        }
      },
      listTasksResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Tarefas listadas com sucesso.' },
          data: {
            $ref: '#/components/Task'
          },
          meta: {
            $ref: '#/components/Pagination'
          }
        }
      },
      createTaskResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Tarefa criada com sucesso.' },
          data: {
            $ref: '#/components/Task'
          }
        }
      },
      getTaskResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Tarefa encontrada com sucesso.' },
          data: {
            $ref: '#/components/Task'
          }
        }
      },
      updateTaskResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Tarefa atualizada com sucesso.' },
          data: {
            $ref: '#/components/Task'
          }
        }
      },
      deleteTaskResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Tarefa deletada com sucesso.' },
          data: {
            $ref: '#/components/Task'
          }
        }
      }
    },
    parameters: {
      taskId: {
        name: 'id',
        in: 'path',
        description: 'ID da tarefa',
        required: true,
        schema: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      },
      taskTitle: {
        name: 'title',
        in: 'query',
        description: 'Filtro por título da tarefa',
        required: false,
        schema: {
          type: 'string',
          example: 'Comprar leite'
        }
      },
      taskStatus: {
        name: 'status',
        in: 'query',
        description: 'Filtro por status da tarefa',
        required: false,
        schema: {
          type: 'string',
          enum: ['pending', 'in_progress', 'completed'],
          example: 'pending'
        }
      },
      page: {
        name: 'page',
        in: 'query',
        description: 'Número da página para paginação',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          example: 1
        }
      },
      pageSize: {
        name: 'pageSize',
        in: 'query',
        description: 'Quantidade de itens por página para paginação',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          example: 10
        }
      }
    }
  }
};

const outputFile = './swagger.json';
const routes = ['./routes/task.routes.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
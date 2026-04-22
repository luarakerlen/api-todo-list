# API de Todo List

API RESTful para gerenciamento de tarefas (todo list) desenvolvida em Node.js com Express, TypeScript, Prisma ORM e PostgreSQL.

## Objetivo do Projeto

Esta API permite que usuários cadastrados gerenciem suas tarefas pessoais, incluindo:

- **Criar** tarefas com título, descrição e status
- **Listar** tarefas com filtros e paginação
- **Buscar** tarefas específicas
- **Atualizar** tarefas existentes
- **Remover** tarefas

Cada usuário acessa apenas suas próprias tarefas, garantindo isolamento e segurança dos dados.

---

## Tecnologias Utilizadas

| Tecnologia               | Descrição                      |
| ------------------------ | ------------------------------ |
| **Node.js**              | Runtime JavaScript             |
| **Express**              | Framework web                  |
| **TypeScript**           | Linguagem com tipagem estática |
| **Prisma**               | ORM para banco de dados        |
| **PostgreSQL**           | Banco de dados relacional      |
| **JSON Web Token (JWT)** | Autenticação stateless         |
| **bcrypt**               | Criptografia de senhas         |
| **Docker**               | Containerização                |
| **Swagger**              | Documentação da API            |

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env-example`:

```env
# Porta do servidor
PORT=3030

# URL de conexão com o banco de dados
# Para Docker: postgresql://postgres:postgres@db:5432/meubanco?schema=public
# Para local/cloud: postgresql://usuario:senha@host:5432/banco
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/meubanco?schema=public"

# Chave secreta para assinar tokens JWT (use uma string longa e aleatória)
JWT_SECRET="sua_chave_secreta_muito_segura_aqui"

# Tempo de expiração do token JWT (ex: 1h, 24h, 7d)
JWT_EXPIRES_IN="1h"
```

| Variável         | Obrigatório | Descrição                        |
| ---------------- | ----------- | -------------------------------- |
| `PORT`           | Não         | Porta do servidor (padrão: 3030) |
| `DATABASE_URL`   | Sim         | URL de conexão com PostgreSQL    |
| `JWT_SECRET`     | Sim         | Chave para assinar tokens JWT    |
| `JWT_EXPIRES_IN` | Sim         | Tempo de expiração do token      |

---

## Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

```bash
# Clonar o repositório
git clone https://github.com/luarakerlen/api-todo-list.git
cd api-todo-list

# Criar arquivo .env
cp .env-example .env
# Editar .env com suas configurações
```

### Com Docker (Recomendado)

```bash
# Construir e iniciar containers
docker compose up --build

# Execute as migrações do Prisma
docker compose exec app npx prisma migrate deploy

# A API estará disponível em http://localhost:3030
# Documentação Swagger em http://localhost:3030/docs
```

### Sem Docker (Desenvolvimento Local)

```bash
# Instalar dependências
npm install

# Configurar PostgreSQL localmente ou usar serviço cloud

# Executar migrações
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate

# Iniciar servidor
npm run dev
# A API estará disponível em http://localhost:3030
# Documentação Swagger em http://localhost:3030/docs
```

### Scripts Disponíveis

| Script            | Descrição                                     |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Inicia em modo desenvolvimento com autoreload |
| `npm run build`   | Compila TypeScript para JavaScript            |
| `npm run start`   | Inicia servidor em produção                   |
| `npm run swagger` | Gera documentação Swagger                     |

---

## Rotas da Aplicação

### Rotas Públicas

| Método | Rota          | Descrição                           |
| ------ | ------------- | ----------------------------------- |
| GET    | `/health`     | Verificar se a API está funcionando |
| POST   | `/users`      | Criar novo usuário                  |
| POST   | `/auth/login` | Autenticar usuário e obter token    |

### Rotas Protegidas (requerem token JWT)

| Método | Rota         | Descrição                 |
| ------ | ------------ | ------------------------- |
| GET    | `/tasks`     | Listar tarefas do usuário |
| POST   | `/tasks`     | Criar nova tarefa         |
| GET    | `/tasks/:id` | Buscar tarefa por ID      |
| PUT    | `/tasks/:id` | Atualizar tarefa          |
| DELETE | `/tasks/:id` | Remover tarefa            |

#### End Points Disponíveis

![End Points da Api](./src/docs/api-end-points.png)

#### Diagrama UML

![Diagrama UML](./src/docs/uml.png)

#### Diagrama de Caso de Uso

![Caso de Uso](./src/docs/user-case.png)

---

## Exemplos de Requisição e Resposta

### Criar Usuário

**Requisição:**

```bash
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (201):**

```json
{
	"success": true,
	"message": "Usuário criado com sucesso.",
	"data": {
		"id": "123e4567-e89b-12d3-a456-426614174000",
		"name": "João Silva",
		"email": "joao@example.com",
		"createdAt": "2024-06-01T12:00:00Z"
	}
}
```

### Login

**Requisição:**

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (200):**

```json
{
	"success": true,
	"message": "Autenticação realizada com sucesso.",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"user": { "id": "...", "name": "João Silva", "email": "joao@example.com" }
	}
}
```

### Criar Tarefa (protegida)

**Requisição:**

```bash
POST /tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Comprar leite",
  "description": "Ir ao supermercado",
  "status": "pending"
}
```

**Resposta (201):**

```json
{
	"success": true,
	"message": "Tarefa criada com sucesso.",
	"data": {
		"id": "123e4567-e89b-12d3-a456-426614174000",
		"title": "Comprar leite",
		"description": "Ir ao supermercado",
		"status": "pending",
		"createdAt": "2024-06-01T12:00:00Z"
	}
}
```

### Listar Tarefas com Filtros (protegida)

**Requisição:**

```bash
GET /tasks?status=pending&page=1&pageSize=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**

```json
{
	"success": true,
	"message": "Tarefas listadas com sucesso.",
	"data": {
		"items": [{ "id": "...", "title": "Comprar leite", "status": "pending" }],
		"pagination": {
			"page": 1,
			"pageSize": 10,
			"total": 5,
			"totalPages": 1
		}
	}
}
```

---

## Regras de Autenticação

A API utiliza **JWT (JSON Web Token)** para autenticação stateless.

### Como Funciona

1. **Login**: O usuário envia email e senha
2. **Token**: Se as credenciais forem válidas, um token JWT é retornado
3. **Requisições**: O token deve ser enviado no header das requisições protegidas

### Formato do Token

O token JWT possui três partes separadas por ponto:

```
xxxxx.yyyyy.zzzzz
Header . Payload . Assinatura
```

**Estrutura do Payload:**

```json
{
	"userId": "uuid-do-usuario",
	"iat": 1234567890, // Issued At (timestamp de emissão)
	"exp": 1234571490 // Expiration (timestamp de expiração)
}
```

### Como Enviar o Token

Inclua o token no header `Authorization` com o prefixo `Bearer`:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Tempo de Expiração

O token expira conforme configurado em `JWT_EXPIRES_IN` (padrão: `1h`).

Após expirar, o usuário deve fazer login novamente.

### Validação do Token

| Situação       | Resposta                           |
| -------------- | ---------------------------------- |
| Token ausente  | 401 - "Token não fornecido"        |
| Token inválido | 401 - "Token inválido ou expirado" |
| Token expirado | 401 - "Token inválido ou expirado" |
| Token válido   | Requisição processada normalmente  |

### Rotas Protegidas

Todas as rotas de tarefas (`/tasks`, `/tasks/:id`) requerem autenticação.

Rotas públicas: `/health`, `/users`, `/auth/login`

### Boas Práticas

- **Nunca** exponha o `JWT_SECRET` em código cliente
- **Guarde** tokens em local seguro (não usar localStorage para produção)
- **Use HTTPS** em produção para proteger o token
- **Configure** tempo de expiração adequado (`1h` recomendado)

---

## Estrutura do Projeto

```
├── src/
│   ├── controllers/     # Controladores da API
│   ├── database/        # Repositories do banco de dados
│   ├── docs/            # Imagens e utilitários
│   ├── dtos/            # Data Transfer Objects
│   ├── envs/            # Configurações de ambiente
│   ├── middlewares/      # Middlewares (autenticação, validação)
│   ├── models/          # Modelos de dados
│   ├── routes/          # Definições de rotas
│   ├── services/        # Lógica de negócio
│   ├── shared/          # Arquivos compartilhados
│   ├── utils/           # Utilitários
│   ├── app.ts           # Configuração do Express
│   └── server.ts       # Ponto de entrada
├── prisma/
│   ├── schema.prisma    # Esquema do banco
│   └── migrations/     # Migrações Prisma
├── .env                # Variáveis de ambiente
├── .env-example        # Template de variáveis
├── docker-compose.yml  # Serviços Docker
├── package.json         # Dependências e scripts
└── readme.md           # Este arquivo
```

---

## Documentação da API (Swagger)

Após iniciar a API, acesse a documentação interativa:

```
http://localhost:3030/docs
```

---

## Funcionalidades Implementadas

### Obrigatórias

- [x] Cadastro de usuários
- [x] Autenticação de usuários (JWT)
- [x] Segurança no salvamento da senha (bcrypt)
- [x] CRUD completo de tarefas
- [x] Proteção de rotas
- [x] Isolamento de dados por usuário

### Extras

- [x] Paginação de tarefas
- [x] Filtragem de tarefas por status
- [x] Busca de tarefas por título
- [x] Docker para desenvolvimento
- [ ] Testes automatizados
- [ ] Refresh token
- [ ] Deploy da API
- [ ] Logs estruturados
- [ ] Rate limiting

### Decisões de projeto adotadas

- Documentação de rotas, controllers e services com TSDocs.
- Documentação da API com Swagger.
- Utilização de Docker.
- Mensagens de erro em português.
- Utilização do Repository Pattern.
- Padronização de respostas HTTP através do HTTPResponse

---


## Requisitos

<div style="display: flex; gap: 40px;">

<div>

### 🔹 Requisitos Funcionais

| ID   | Requisito |
|------|----------|
| RF01 | Cadastro de usuários |
| RF02 | Login de usuários |
| RF03 | Criar tarefa |
| RF04 | Listar tarefas |
| RF05 | Buscar tarefa por ID |
| RF06 | Atualizar tarefa |
| RF07 | Remover tarefa |
| RF08 | Isolar tarefas por usuário |
| RF09 | Status da tarefa (pendente, em progresso, concluída) |

</div>

<div>

### 🔸 Requisitos Não Funcionais

| ID   | Requisito |
|------|----------|
| RNF01 | Autenticação JWT |
| RNF02 | Rotas protegidas |
| RNF03 | Senhas criptografadas |
| RNF04 | Email único |
| RNF05 | Validação de campos |
| RNF06 | Tratamento de erros |
| RNF07 | Documentação Swagger |
| RNF08 | Uso correto de códigos HTTP |

</div>

</div>

--- 
## Contribuição

Contribuições são bem-vindas! Abra issues e pull requests.

## Licença

ISC

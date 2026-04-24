import { TaskService } from "../../src/services/task.service";
import { prismaMock } from "../config/prisma.mock";

prismaMock.task.findMany.mockResolvedValue([
  {
    id: "task1",
    userId: "12345",
    title: "Task 1",
    description: "Descrição da Task 1",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "task2",
    userId: "12345",
    title: "Task 2",
    description: "Descrição da Task 2",
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
])

describe("Testes para o método create de task.service", () => {
  test("deveria retornar status 201 ao criar uma nova task", async () => {
    const userId = "12345";

    // 1 - Arrange
    const mockDependency = {} as any;
    const sut = new TaskService(mockDependency);

    // Mock para taskRepository.listTasks deve retornar uma lista de tasks para o usuário especificado

    // 2 - Act
    const result = await sut.listTasks({ userId });

    // 3 - Assert
    expect(result).toBeDefined();
    expect(result).toHaveProperty("data");
  })
})
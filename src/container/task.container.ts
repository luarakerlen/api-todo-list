import { TaskService } from "../services";
import { TaskController } from "../controllers";
import { TaskRepository } from "../repositories";

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

export { taskController };

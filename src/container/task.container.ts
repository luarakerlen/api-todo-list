import { TaskRepository } from '../database';
import { TaskService } from "../services";
import { TaskController } from "../controllers";

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

export { taskController };

import { log } from "console";
import App from "./app";
import { envs } from "./envs";
import {
  HealthRoutes,
  UsersRoutes,
  TaskRoutes
} from "./routes";


if (envs.PORT === undefined || envs.PORT == null) {
  console.log("Algo errado");

}
const app = new App(
  [
    HealthRoutes.bind(),
    UsersRoutes.bind(),
    TaskRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();

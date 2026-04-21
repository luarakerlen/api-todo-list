import "dotenv/config";

import App from "./app";
import { envs } from "./envs";
import {
  HealthRoutes,
  UsersRoutes,
  TaskRoutes
} from "./routes";
import { AuthRoutes } from "./routes/auth.routes";


if (envs.PORT === undefined || envs.PORT == null) {
  console.log("Algo errado");

}
const app = new App(
  [
    HealthRoutes.bind(),
    UsersRoutes.bind(),
    TaskRoutes.bind(),
    AuthRoutes.bind()
  ],
  envs.PORT,
);

app.listen();

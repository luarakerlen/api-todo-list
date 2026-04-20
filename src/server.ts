import App from "./app";
import { envs } from "./envs";
import {
  HealthRoutes,
  TaskRoutes
} from "./routes";

const app = new App(
  [
    HealthRoutes.bind(),
    TaskRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();

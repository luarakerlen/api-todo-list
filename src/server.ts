import App from "./app";
import { envs } from "./envs";
import {
  ExampleRoutes,
  TaskRoutes
} from "./routes";

const app = new App(
  [
    ExampleRoutes.bind(),
    TaskRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();

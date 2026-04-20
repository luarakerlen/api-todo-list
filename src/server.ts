import { log } from "console";
import App from "./app";
import { envs } from "./envs";
import {
  ExampleRoutes,
  UsersRoutes
} from "./routes";


if (envs.PORT === undefined || envs.PORT == null) {
  console.log("Algo errado");

}
const app = new App(
  [
    ExampleRoutes.bind(),
    UsersRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();

import { log } from "console";
import App from "./app";
import { envs } from "./envs";
import {
  ExampleRoutes
} from "./routes";
import { UsersRoutes } from "./routes/users.routes";


if (envs.PORT === undefined || envs.PORT == null) {
  console.log("Algo errado");

}
const app = new App(
  [
    ExampleRoutes.bind(),
    UsersRoutes.bind()
    // Add more routes here

  ],
  envs.PORT,
);

app.listen();

import express from "express";
import { port } from "./config/environtment.js";
import UserController from "./controller/users.js";
const app = express();

app.use("/api", UserController);

app.listen(port, () => {
  console.log("port listen on ", port);
});

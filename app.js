import express from "express";
import { port } from "./config/environtment.js";
import UserController from "./controller/users.js";
import path from "path";

const app = express();

app.use("/api", UserController);

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log("port listen on ", port);
});

import express from "express";
import { port } from "./config/environtment.js";
import UserController from "./controller/usersController.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js"; // Import the Swagger configuration
import path from "path";

const app = express();

app.use("/api", UserController);

// Serve Swagger UI documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log("port listen on ", port);
});

import express from "express";
import { port } from "./config/environtment.js";
import authController from "./controller/authController.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js"; // Import the Swagger configuration
import path from "path";
import bodyParser from "body-parser";
import { EventEmitter } from "events";
import cors from 'cors'
const app = express();


app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/auth", authController);

// Serve Swagger UI documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log("port listen on ", port);
});

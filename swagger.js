// swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

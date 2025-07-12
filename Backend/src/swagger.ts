import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Gestión de Proyectos",
    version: "1.0.0",
    description: "Documentación básica de la API",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor local",
    },
  ],
};

const options: swaggerJSDoc.Options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts"],  // apunta a tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  // Determina el código y el mensaje por defecto
  let statusCode = 500;
  let message = "Internal Server Error";

  // Violation of unique constraint (Prisma)
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    statusCode = 400;
    message = "Ya existe un valor duplicado";
  }
  // Errores de validación de Zod
  else if (error.name === "ZodError") {
    statusCode = 400;
    // @ts-ignore
    message = (error as any).errors.map((e: any) => e.message).join(", ");
  }
  // Errores que lanzaste manualmente con `throw new Error("...")`
  else if (error instanceof Error) {
    message = error.message;
  }

  // Log conciso en consola
  console.error(`🚨 [${req.method} ${req.path}] ${error.name}: ${message}`);

  // Envía la respuesta estandarizada
  res.status(statusCode).json({
    status: "error",
    message,
  });
};

export default errorHandler;

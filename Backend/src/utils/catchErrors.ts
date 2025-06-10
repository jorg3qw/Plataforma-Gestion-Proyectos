import { NextFunction, Request, Response } from "express";

// Tipo para un controlador asíncrono
type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// Función que envuelve al controlador para capturar errores
const catchErrors = (controller: AsyncController): AsyncController =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error); // pasa el error al middleware global
    }
  };

export default catchErrors;

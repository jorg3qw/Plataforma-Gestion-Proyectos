import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validarDatos = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errores = error.errors.map((e) => e.message);
        res.status(400).json({ errores });
        return;
      }
      next(error);
    }
  };
};

import { Request, Response } from "express";
import { PrioridadService } from "../services/prioridad.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

export class PrioridadController {
  private readonly service = new PrioridadService();

  crearPrioridad = async (req: Request, res: Response) => {
    const prioridad = await this.service.crearPrioridad(req.body);
    res.status(201).json(
      RespuestaEstandarizada.success("Prioridad creada correctamente", prioridad, 201)
    );
  };

  obtenerTodas = async (_req: Request, res: Response) => {
    const prioridades = await this.service.obtenerTodas();
    res.json(
      RespuestaEstandarizada.success("Prioridades obtenidas correctamente", prioridades)
    );
  };

  obtenerPorId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const prioridad = await this.service.obtenerPorId(id);
    if (!prioridad) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Prioridad no encontrada", 404));
    }
    return res.json(
      RespuestaEstandarizada.success("Prioridad obtenida correctamente", prioridad)
    );
  };

  actualizarPrioridad = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const prioridad = await this.service.actualizarPrioridad(id, req.body);
    res.json(
      RespuestaEstandarizada.success("Prioridad actualizada correctamente", prioridad)
    );
  };

  eliminarPrioridad = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const prioridad = await this.service.eliminarPrioridad(id);
    res.json(
      RespuestaEstandarizada.success("Prioridad eliminada correctamente", prioridad)
    );
  };
}
import { Request, Response } from "express";
import { PrioridadService } from "../services/prioridad.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

export class PrioridadController {
  private readonly service = new PrioridadService();

  async crearPrioridad(req: Request, res: Response) {
    const prioridad = await this.service.crearPrioridad(req.body);
    return res
      .status(201)
      .json(
        RespuestaEstandarizada.success(
          "Prioridad creada correctamente",
          prioridad,
          201
        )
      );
  }

  async obtenerPrioridades(_req: Request, res: Response) {
    const lista = await this.service.obtenerPrioridades();
    return res.json(
      RespuestaEstandarizada.success(
        "Prioridades obtenidas correctamente",
        lista
      )
    );
  }

  async obtenerPrioridadPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const prioridad = await this.service.obtenerPrioridadPorId(id);
    if (!prioridad) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Prioridad no encontrada", 404));
    }
    return res.json(
      RespuestaEstandarizada.success(
        "Prioridad obtenida correctamente",
        prioridad
      )
    );
  }

  async actualizarPrioridad(req: Request, res: Response) {
    const id = Number(req.params.id);
    const prioridad = await this.service.actualizarPrioridad(id, req.body);
    return res.json(
      RespuestaEstandarizada.success(
        "Prioridad actualizada correctamente",
        prioridad
      )
    );
  }

  async eliminarPrioridad(req: Request, res: Response) {
    const id = Number(req.params.id);
    const prioridad = await this.service.eliminarPrioridad(id);
    return res.json(
      RespuestaEstandarizada.success(
        "Prioridad eliminada correctamente",
        prioridad
      )
    );
  }
}

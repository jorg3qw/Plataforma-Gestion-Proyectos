import { Request, Response } from "express";
import { TipoTareaService } from "../services/tipo_tarea.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const service = new TipoTareaService();

export class TipoTareaController {
  async crearTipoTarea(req: Request, res: Response) {
    const tipo = await service.crearTipoTarea(req.body);
    return res
      .status(201)
      .json(
        RespuestaEstandarizada.success(
          "Tipo de tarea creado correctamente",
          tipo,
          201
        )
      );
  }

  async obtenerTiposTarea(_req: Request, res: Response) {
    const tipos = await service.obtenerTiposTarea();
    return res.json(
      RespuestaEstandarizada.success(
        "Tipos de tarea obtenidos correctamente",
        tipos
      )
    );
  }

  async obtenerTipoTareaPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const tipo = await service.obtenerTipoTareaPorId(id);
    if (!tipo) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Tipo de tarea no encontrado", 404));
    }
    return res.json(
      RespuestaEstandarizada.success(
        "Tipo de tarea obtenido correctamente",
        tipo
      )
    );
  }

  async actualizarTipoTarea(req: Request, res: Response) {
    const id = Number(req.params.id);
    const tipo = await service.actualizarTipoTarea(id, req.body);
    return res.json(
      RespuestaEstandarizada.success(
        "Tipo de tarea actualizado correctamente",
        tipo
      )
    );
  }

  async eliminarTipoTarea(req: Request, res: Response) {
    const id = Number(req.params.id);
    const tipo = await service.eliminarTipoTarea(id);
    return res.json(
      RespuestaEstandarizada.success(
        "Tipo de tarea eliminado correctamente",
        tipo
      )
    );
  }
}

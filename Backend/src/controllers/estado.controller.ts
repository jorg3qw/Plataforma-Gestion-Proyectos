import { Request, Response } from "express";
import { EstadoService } from "../services/estado.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const service = new EstadoService();

export class EstadoController {
  async crearEstado(req: Request, res: Response) {
    const estado = await service.crearEstado(req.body);
    return res
      .status(201)
      .json(
        RespuestaEstandarizada.success(
          "Estado creado correctamente",
          estado,
          201
        )
      );
  }

  async obtenerEstados(_req: Request, res: Response) {
    const lista = await service.obtenerEstados();
    return res.json(
      RespuestaEstandarizada.success(
        "Estados obtenidos correctamente",
        lista
      )
    );
  }

  async obtenerEstadoPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const estado = await service.obtenerEstadoPorId(id);
    if (!estado) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Estado no encontrado", 404));
    }
    return res.json(
      RespuestaEstandarizada.success(
        "Estado obtenido correctamente",
        estado
      )
    );
  }

  async actualizarEstado(req: Request, res: Response) {
    const id = Number(req.params.id);
    const estado = await service.actualizarEstado(id, req.body);
    return res.json(
      RespuestaEstandarizada.success(
        "Estado actualizado correctamente",
        estado
      )
    );
  }

  async eliminarEstado(req: Request, res: Response) {
    const id = Number(req.params.id);
    const estado = await service.eliminarEstado(id);
    return res.json(
      RespuestaEstandarizada.success(
        "Estado eliminado correctamente",
        estado
      )
    );
  }
}

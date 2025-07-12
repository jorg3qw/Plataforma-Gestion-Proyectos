import { Request, Response } from "express";
import { ColumnaService } from "../services/columna.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const service = new ColumnaService();

export class ColumnaController {
  async crearColumna(req: Request, res: Response) {
    const columna = await service.crearColumna(req.body);
    return res
      .status(201)
      .json(RespuestaEstandarizada.success("Columna creada correctamente", columna, 201));
  }

  async obtenerColumnas(_req: Request, res: Response) {
    const columnas = await service.obtenerColumnas();
    return res.json(RespuestaEstandarizada.success("Columnas obtenidas correctamente", columnas));
  }

  async obtenerColumnaPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const columna = await service.obtenerColumnaPorId(id);
    if (!columna) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Columna no encontrada", 404));
    }
    return res.json(RespuestaEstandarizada.success("Columna obtenida correctamente", columna));
  }

  async actualizarColumna(req: Request, res: Response) {
    const id = Number(req.params.id);
    const columna = await service.actualizarColumna(id, req.body);
    return res.json(RespuestaEstandarizada.success("Columna actualizada correctamente", columna));
  }

  async eliminarColumna(req: Request, res: Response) {
    const id = Number(req.params.id);
    const columna = await service.eliminarColumna(id);
    return res.json(RespuestaEstandarizada.success("Columna eliminada correctamente", columna));
  }
}

import { Request, Response } from "express";
import { TareaEtiquetaService } from "../services/tarea_etiqueta.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const svc = new TareaEtiquetaService();

export class TareaEtiquetaController {
  async crear(req: Request, res: Response) {
    const dto = req.body;
    const te = await svc.crear(dto);
    return res.status(201).json(RespuestaEstandarizada.success("Relación creada", te, 201));
  }
  async obtenerTodos(_r: Request, res: Response) {
    const list = await svc.obtenerTodos();
    return res.json(RespuestaEstandarizada.success("Relaciones obtenidas", list));
  }
  async eliminar(req: Request, res: Response) {
    const { id_tarea, id_etiqueta } = req.params as any;
    const d = await svc.eliminar(+id_tarea, +id_etiqueta);
    return res.json(RespuestaEstandarizada.success("Relación eliminada", d));
  }
}

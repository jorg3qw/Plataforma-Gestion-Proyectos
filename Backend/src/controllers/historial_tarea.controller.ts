import { Request, Response } from "express";
import { HistorialTareaService } from "../services/historial_tarea.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const svc = new HistorialTareaService();

export class HistorialTareaController {
  async crear(req: Request, res: Response) {
    const h = await svc.crear(req.body);
    return res.status(201).json(RespuestaEstandarizada.success("Historial creado", h, 201));
  }
  async obtenerTodos(_req: Request, res: Response) {
    const list = await svc.obtenerTodos();
    return res.json(RespuestaEstandarizada.success("Historial obtenido", list));
  }
  async obtenerPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const h = await svc.obtenerPorId(id);
    if (!h) return res.status(404).json(RespuestaEstandarizada.error("No encontrado", 404));
    return res.json(RespuestaEstandarizada.success("Historial obtenido", h));
  }
  async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const u = await svc.actualizar(id, req.body);
    return res.json(RespuestaEstandarizada.success("Historial actualizado", u));
  }
  async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const d = await svc.eliminar(id);
    return res.json(RespuestaEstandarizada.success("Historial eliminado", d));
  }
}

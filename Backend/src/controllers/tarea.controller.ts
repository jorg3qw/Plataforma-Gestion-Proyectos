import { Request, Response } from "express";
import { TareaService } from "../services/tarea.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const svc = new TareaService();

export class TareaController {
  async crear(req: Request, res: Response) {
    const t = await svc.crear(req.body);
    return res.status(201).json(RespuestaEstandarizada.success("Tarea creada", t, 201));
  }
  async obtenerTodas(_r: Request, res: Response) {
    const list = await svc.obtenerTodas();
    return res.json(RespuestaEstandarizada.success("Tareas obtenidas", list));
  }
  async obtenerPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const t = await svc.obtenerPorId(id);
    if (!t) return res.status(404).json(RespuestaEstandarizada.error("No encontrado", 404));
    return res.json(RespuestaEstandarizada.success("Tarea obtenida", t));
  }
  async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const t = await svc.actualizar(id, req.body);
    return res.json(RespuestaEstandarizada.success("Tarea actualizada", t));
  }
  async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const t = await svc.eliminar(id);
    return res.json(RespuestaEstandarizada.success("Tarea eliminada", t));
  }
}

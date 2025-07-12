import { Request, Response } from "express";
import { TableroService } from "../services/tablero.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const svc = new TableroService();

export class TableroController {
  async crear(req: Request, res: Response) {
    const t = await svc.crear(req.body);
    return res.status(201).json(RespuestaEstandarizada.success("Tablero creado", t, 201));
  }
  async obtenerTodos(_r: Request, res: Response) {
    const list = await svc.obtenerTodos();
    return res.json(RespuestaEstandarizada.success("Tableros obtenidos", list));
  }
  async obtenerPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const t = await svc.obtenerPorId(id);
    if (!t) return res.status(404).json(RespuestaEstandarizada.error("No encontrado", 404));
    return res.json(RespuestaEstandarizada.success("Tablero obtenido", t));
  }
  async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const t = await svc.actualizar(id, req.body);
    return res.json(RespuestaEstandarizada.success("Tablero actualizado", t));
  }
  async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const t = await svc.eliminar(id);
    return res.json(RespuestaEstandarizada.success("Tablero eliminado", t));
  }
}

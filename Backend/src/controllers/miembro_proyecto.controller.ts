import { Request, Response } from "express";
import { MiembroProyectoService } from "../services/miembro_proyecto.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const svc = new MiembroProyectoService();

export class MiembroProyectoController {
  async crear(req: Request, res: Response) {
    const dto = req.body;
    const m = await svc.crear(dto);
    return res.status(201).json(RespuestaEstandarizada.success("Miembro agregado", m, 201));
  }
  async obtenerTodos(_r: Request, res: Response) {
    const list = await svc.obtenerTodos();
    return res.json(RespuestaEstandarizada.success("Miembros obtenidos", list));
  }
  async obtenerPorId(req: Request, res: Response) {
    const { id_proyecto, id_usuario } = req.params as any;
    const m = await svc.obtenerPorId(+id_proyecto, +id_usuario);
    if (!m) return res.status(404).json(RespuestaEstandarizada.error("No encontrado", 404));
    return res.json(RespuestaEstandarizada.success("Miembro obtenido", m));
  }
  async eliminar(req: Request, res: Response) {
    const { id_proyecto, id_usuario } = req.params as any;
    const m = await svc.eliminar(+id_proyecto, +id_usuario);
    return res.json(RespuestaEstandarizada.success("Miembro eliminado", m));
  }
}

import { Request, Response } from "express";
import { ComentarioService } from "../services/comentario.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const svc = new ComentarioService();

export class ComentarioController {
  async crearComentario(req: Request, res: Response) {
    const com = await svc.crearComentario(req.body);
    return res.status(201).json(RespuestaEstandarizada.success("Comentario creado", com, 201));
  }
  async obtenerComentarios(_r: Request, res: Response) {
    const list = await svc.obtenerComentarios();
    return res.json(RespuestaEstandarizada.success("Comentarios obtenidos", list));
  }
  async obtenerComentarioPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const com = await svc.obtenerComentarioPorId(id);
    if (!com) return res.status(404).json(RespuestaEstandarizada.error("No encontrado", 404));
    return res.json(RespuestaEstandarizada.success("Comentario obtenido", com));
  }
  async actualizarComentario(req: Request, res: Response) {
    const id = Number(req.params.id);
    const com = await svc.actualizarComentario(id, req.body);
    return res.json(RespuestaEstandarizada.success("Comentario actualizado", com));
  }
  async eliminarComentario(req: Request, res: Response) {
    const id = Number(req.params.id);
    const com = await svc.eliminarComentario(id);
    return res.json(RespuestaEstandarizada.success("Comentario eliminado", com));
  }
}

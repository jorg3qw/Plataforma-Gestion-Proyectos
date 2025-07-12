import { Request, Response } from "express";
import { ActividadService } from "../services/actividad.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const svc = new ActividadService();

export class ActividadController {
  async crearActividad(req: Request, res: Response) {
    const act = await svc.crearActividad(req.body);
    return res.status(201).json(RespuestaEstandarizada.success("Actividad creada correctamente", act, 201));
  }
  async obtenerActividades(_req: Request, res: Response) {
    const lista = await svc.obtenerActividades();
    return res.json(RespuestaEstandarizada.success("Actividades obtenidas correctamente", lista));
  }
  async obtenerActividadPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const act = await svc.obtenerActividadPorId(id);
    if (!act) return res.status(404).json(RespuestaEstandarizada.error("Actividad no encontrada", 404));
    return res.json(RespuestaEstandarizada.success("Actividad obtenida correctamente", act));
  }
  async actualizarActividad(req: Request, res: Response) {
    const id = Number(req.params.id);
    const act = await svc.actualizarActividad(id, req.body);
    return res.json(RespuestaEstandarizada.success("Actividad actualizada correctamente", act));
  }
  async eliminarActividad(req: Request, res: Response) {
    const id = Number(req.params.id);
    const act = await svc.eliminarActividad(id);
    return res.json(RespuestaEstandarizada.success("Actividad eliminada correctamente", act));
  }
}

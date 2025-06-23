import { Request, Response } from "express";
import { ProyectoService } from "../services/proyecto.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const service = new ProyectoService();

export class ProyectoController {
  async crearProyecto(req: Request, res: Response) {
    const proyecto = await service.crearProyecto(req.body);
    return res
      .status(201)
      .json(RespuestaEstandarizada.success("Proyecto creado correctamente", proyecto, 201));
  }

  async obtenerProyectos(_req: Request, res: Response) {
    const proyectos = await service.obtenerProyectos();
    return res.json(RespuestaEstandarizada.success("Proyectos obtenidos correctamente", proyectos));
  }

  async obtenerProyectoPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const proyecto = await service.obtenerProyectoPorId(id);
    if (!proyecto) {
      return res.status(404).json(RespuestaEstandarizada.error("Proyecto no encontrado", 404));
    }
    return res.json(RespuestaEstandarizada.success("Proyecto obtenido correctamente", proyecto));
  }

  async actualizarProyecto(req: Request, res: Response) {
    const id = Number(req.params.id);
    const proyecto = await service.actualizarProyecto(id, req.body);
    return res.json(RespuestaEstandarizada.success("Proyecto actualizado correctamente", proyecto));
  }

  async eliminarProyecto(req: Request, res: Response) {
    const id = Number(req.params.id);
    const proyecto = await service.eliminarProyecto(id);
    return res.json(RespuestaEstandarizada.success("Proyecto eliminado correctamente", proyecto));
  }
}

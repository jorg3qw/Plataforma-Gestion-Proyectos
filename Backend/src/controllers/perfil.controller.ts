import { Request, Response } from "express";
import { PerfilService } from "../services/perfil.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

export class PerfilController {
  private readonly perfilService = new PerfilService();

  crearPerfil = async (req: Request, res: Response) => {
    const perfil = await this.perfilService.crearPerfil(req.body);
    res.status(201).json(
      RespuestaEstandarizada.success("Perfil creado correctamente", perfil, 201)
    );
  };

  obtenerPerfiles = async (_: Request, res: Response) => {
    const perfiles = await this.perfilService.obtenerPerfiles();
    res.json(
      RespuestaEstandarizada.success("Perfiles obtenidos correctamente", perfiles)
    );
  };

  obtenerPerfilPorId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const perfil = await this.perfilService.obtenerPerfilPorId(id);
    if (!perfil) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Perfil no encontrado", 404));
    }
    return res.json(
      RespuestaEstandarizada.success("Perfil obtenido correctamente", perfil)
    );
  };

  actualizarPerfil = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const perfilActualizado = await this.perfilService.actualizarPerfil(id, req.body);
    res.json(
      RespuestaEstandarizada.success("Perfil actualizado correctamente", perfilActualizado)
    );
  };

  eliminarPerfil = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const perfilEliminado = await this.perfilService.eliminarPerfil(id);
    res.json(
      RespuestaEstandarizada.success("Perfil eliminado correctamente", perfilEliminado)
    );
  };
}
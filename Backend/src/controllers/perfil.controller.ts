import { Request, Response } from "express";
import { PerfilService } from "../services/perfil.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

export class PerfilController {
  private readonly service = new PerfilService();

  async crearPerfil(req: Request, res: Response) {
    const perfil = await this.service.crearPerfil(req.body);
    return res
      .status(201)
      .json(
        RespuestaEstandarizada.success(
          "Perfil creado correctamente",
          perfil,
          201
        )
      );
  }

  async obtenerPerfiles(_req: Request, res: Response) {
    const perfiles = await this.service.obtenerPerfiles();
    return res.json(
      RespuestaEstandarizada.success(
        "Perfiles obtenidos correctamente",
        perfiles
      )
    );
  }

  async obtenerPerfilPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const perfil = await this.service.obtenerPerfilPorId(id);
    if (!perfil) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Perfil no encontrado", 404));
    }
    return res.json(
      RespuestaEstandarizada.success(
        "Perfil obtenido correctamente",
        perfil
      )
    );
  }

  async actualizarPerfil(req: Request, res: Response) {
    const id = Number(req.params.id);
    const perfilActualizado = await this.service.actualizarPerfil(
      id,
      req.body
    );
    return res.json(
      RespuestaEstandarizada.success(
        "Perfil actualizado correctamente",
        perfilActualizado
      )
    );
  }

  async eliminarPerfil(req: Request, res: Response) {
    const id = Number(req.params.id);
    const perfilEliminado = await this.service.eliminarPerfil(id);
    return res.json(
      RespuestaEstandarizada.success(
        "Perfil eliminado correctamente",
        perfilEliminado
      )
    );
  }
}

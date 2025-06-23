import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

const service = new UsuarioService();

export class UsuarioController {
  async crearUsuario(req: Request, res: Response) {
    const usuario = await service.crearUsuario(req.body);
    return res
      .status(201)
      .json(
        RespuestaEstandarizada.success(
          "Usuario creado correctamente",
          usuario,
          201
        )
      );
  }

  async obtenerUsuarios(_req: Request, res: Response) {
    const usuarios = await service.obtenerUsuarios();
    return res.json(
      RespuestaEstandarizada.success(
        "Usuarios obtenidos correctamente",
        usuarios
      )
    );
  }

  async obtenerUsuarioPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const usuario = await service.obtenerUsuarioPorId(id);
    if (!usuario) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Usuario no encontrado", 404));
    }
    return res.json(
      RespuestaEstandarizada.success(
        "Usuario obtenido correctamente",
        usuario
      )
    );
  }

  async actualizarUsuario(req: Request, res: Response) {
    const id = Number(req.params.id);
    const usuario = await service.actualizarUsuario(id, req.body);
    return res.json(
      RespuestaEstandarizada.success(
        "Usuario actualizado correctamente",
        usuario
      )
    );
  }

  async eliminarUsuario(req: Request, res: Response) {
    const id = Number(req.params.id);
    const usuario = await service.eliminarUsuario(id);
    return res.json(
      RespuestaEstandarizada.success(
        "Usuario eliminado correctamente",
        usuario
      )
    );
  }
}

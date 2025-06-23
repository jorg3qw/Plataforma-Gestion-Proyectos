import prisma from "../config/database";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { CrearUsuarioDto, ActualizarUsuarioDto } from "../dtos/usuario.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repository = new UsuarioRepository();

export class UsuarioService {
  /** Asegura que id_perfil (si viene) exista y esté Activo */
  private async validarPerfil(id_perfil?: number) {
    if (id_perfil == null) return;
    const perfil = await prisma.perfiles.findFirst({
      where: { id_perfil, estado_auditoria: EstadoAuditoria.Activo },
    });
    if (!perfil) throw new Error("Perfil no encontrado");
  }

  async crearUsuario(data: CrearUsuarioDto) {
    await this.validarPerfil(data.id_perfil);
    return repository.crearUsuario(data);
  }

  async obtenerUsuarios() {
    return repository.obtenerUsuarios();
  }

  async obtenerUsuarioPorId(id: number) {
    return repository.obtenerUsuarioPorId(id);
  }

  async actualizarUsuario(id: number, data: ActualizarUsuarioDto) {
    if (data.id_perfil !== undefined) {
      await this.validarPerfil(data.id_perfil);
    }
    return repository.actualizarUsuario(id, data);
  }

  async eliminarUsuario(id: number) {
    return repository.eliminarUsuario(id);
  }
}

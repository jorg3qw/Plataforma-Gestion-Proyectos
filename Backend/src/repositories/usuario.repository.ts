import prisma from "../config/database";
import { CrearUsuarioDto, ActualizarUsuarioDto } from "../dtos/usuario.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class UsuarioRepository {
  crearUsuario(data: CrearUsuarioDto) {
    return prisma.usuarios.create({ data });
  }

  obtenerUsuarios() {
    return prisma.usuarios.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  obtenerUsuarioPorId(id: number) {
    return prisma.usuarios.findFirst({
      where: { id_usuario: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  actualizarUsuario(id: number, data: ActualizarUsuarioDto) {
    return prisma.usuarios.update({
      where: { id_usuario: id },
      data: {
        ...data,
        fecha_modificacion: new Date(),
      },
    });
  }

  eliminarUsuario(id: number) {
    return prisma.usuarios.update({
      where: { id_usuario: id },
      data: {
        estado_auditoria: EstadoAuditoria.Inactivo,
        fecha_modificacion: new Date(),
      },
    });
  }
}

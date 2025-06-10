import prisma from "../config/database";
import { CrearPerfilDto, ActualizarPerfilDto } from "../dtos/perfil.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class PerfilRepository {
  crearPerfil(data: CrearPerfilDto) {
    return prisma.perfiles.create({ data });
  }

  obtenerPerfiles() {
    return prisma.perfiles.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  obtenerPerfilPorId(id: number) {
    return prisma.perfiles.findFirst({
      where: { id_perfil: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  actualizarPerfil(id: number, data: ActualizarPerfilDto) {
    return prisma.perfiles.update({
      where: { id_perfil: id },
      data: {
        ...data,
        fecha_modificacion: new Date(),
      },
    });
  }

  eliminarPerfil(id: number) {
    return prisma.perfiles.update({
      where: { id_perfil: id },
      data: {
        estado_auditoria: EstadoAuditoria.Inactivo,
        fecha_modificacion: new Date(),
      },
    });
  }
}

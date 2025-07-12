import prisma from "../config/database";
import { CrearMiembroProyectoDto } from "../dtos/miembro_proyecto.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class MiembroProyectoRepository {
  crear(data: CrearMiembroProyectoDto) {
    return prisma.miembros_proyecto.create({ data });
  }
  obtenerTodos() {
    return prisma.miembros_proyecto.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }
  obtenerPorId(proyecto: number, usuario: number) {
    return prisma.miembros_proyecto.findUnique({
      where: { id_proyecto_id_usuario: { id_proyecto: proyecto, id_usuario: usuario } },
    });
  }
  eliminar(proyecto: number, usuario: number) {
    return prisma.miembros_proyecto.update({
      where: { id_proyecto_id_usuario: { id_proyecto: proyecto, id_usuario: usuario } },
      data: { estado_auditoria: EstadoAuditoria.Inactivo },
    });
  }
}

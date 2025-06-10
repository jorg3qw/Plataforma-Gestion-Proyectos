import prisma from "../config/database";
import { CrearPrioridadDto, ActualizarPrioridadDto } from "../dtos/prioridad.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class PrioridadRepository {
  crear(data: CrearPrioridadDto) {
    return prisma.prioridades.create({ data: { ...data, estado_auditoria: EstadoAuditoria.Activo } });
  }

  obtenerTodos() {
    return prisma.prioridades.findMany({ where: { estado_auditoria: EstadoAuditoria.Activo } });
  }

  obtenerPorId(id: number) {
    return prisma.prioridades.findFirst({
      where: { id_prioridad: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  actualizar(id: number, data: ActualizarPrioridadDto) {
    return prisma.prioridades.update({
      where: { id_prioridad: id },
      data: { ...data, fecha_modificacion: new Date() },
    });
  }

  eliminar(id: number) {
    return prisma.prioridades.update({
      where: { id_prioridad: id },
      data: { estado_auditoria: EstadoAuditoria.Inactivo, fecha_modificacion: new Date() },
    });
  }
}
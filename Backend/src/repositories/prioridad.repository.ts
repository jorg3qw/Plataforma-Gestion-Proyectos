import prisma from "../config/database";
import { CrearPrioridadDto, ActualizarPrioridadDto } from "../dtos/prioridad.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class PrioridadRepository {
  crearPrioridad(data: CrearPrioridadDto) {
    return prisma.prioridades.create({ data });
  }

  obtenerPrioridades() {
    return prisma.prioridades.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  obtenerPrioridadPorId(id: number) {
    return prisma.prioridades.findFirst({
      where: { id_prioridad: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  actualizarPrioridad(id: number, data: ActualizarPrioridadDto) {
    return prisma.prioridades.update({
      where: { id_prioridad: id },
      data: {
        ...data,
        fecha_modificacion: new Date(),
      },
    });
  }

  eliminarPrioridad(id: number) {
    return prisma.prioridades.update({
      where: { id_prioridad: id },
      data: {
        estado_auditoria: EstadoAuditoria.Inactivo,
        fecha_modificacion: new Date(),
      },
    });
  }
}

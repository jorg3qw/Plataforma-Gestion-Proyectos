import prisma from "../config/database";
import { CrearEstadoDto, ActualizarEstadoDto } from "../dtos/estado.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class EstadoRepository {
  crearEstado(data: CrearEstadoDto) {
    return prisma.estados.create({ data });
  }

  obtenerEstados() {
    return prisma.estados.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo }
    });
  }

  obtenerEstadoPorId(id: number) {
    return prisma.estados.findFirst({
      where: { id_estado: id, estado_auditoria: EstadoAuditoria.Activo }
    });
  }

  actualizarEstado(id: number, data: ActualizarEstadoDto) {
    return prisma.estados.update({
      where: { id_estado: id },
      data: {
        ...data,
        fecha_modificacion: new Date()
      }
    });
  }

  eliminarEstado(id: number) {
    return prisma.estados.update({
      where: { id_estado: id },
      data: {
        estado_auditoria: EstadoAuditoria.Inactivo,
        fecha_modificacion: new Date()
      }
    });
  }
}

import prisma from "../config/database";
import { CrearActividadDto, ActualizarActividadDto } from "../dtos/actividad.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class ActividadRepository {
  crearActividad(data: CrearActividadDto) {
    return prisma.actividades.create({ data });
  }
  obtenerActividades() {
    return prisma.actividades.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }
  obtenerActividadPorId(id: number) {
    return prisma.actividades.findFirst({
      where: { id_actividad: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }
  actualizarActividad(id: number, data: ActualizarActividadDto) {
    return prisma.actividades.update({
      where: { id_actividad: id },
      data: { ...data, fecha: new Date() },
    });
  }
  eliminarActividad(id: number) {
    return prisma.actividades.update({
      where: { id_actividad: id },
      data: { estado_auditoria: EstadoAuditoria.Inactivo, fecha: new Date() },
    });
  }
}

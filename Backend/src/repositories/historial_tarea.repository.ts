import prisma from "../config/database";
import { CrearHistorialTareaDto, ActualizarHistorialTareaDto } from "../dtos/historial_tarea.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class HistorialTareaRepository {
  crear(data: CrearHistorialTareaDto) {
    return prisma.historial_tareas.create({ data });
  }
  obtenerTodos() {
    return prisma.historial_tareas.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }
  obtenerPorId(id: number) {
    return prisma.historial_tareas.findFirst({
      where: { id_historial: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }
  actualizar(id: number, data: ActualizarHistorialTareaDto) {
    return prisma.historial_tareas.update({
      where: { id_historial: id },
      data: { ...data, fecha: new Date() },
    });
  }
  eliminar(id: number) {
    return prisma.historial_tareas.update({
      where: { id_historial: id },
      data: { estado_auditoria: EstadoAuditoria.Inactivo, fecha: new Date() },
    });
  }
}

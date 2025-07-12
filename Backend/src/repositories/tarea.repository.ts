import prisma from "../config/database";
import { CrearTareaDto, ActualizarTareaDto } from "../dtos/tarea.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class TareaRepository {
  crear(data: CrearTareaDto) {
    return prisma.tareas.create({ data });
  }
  obtenerTodas() {
    return prisma.tareas.findMany({ where: { estado_auditoria: EstadoAuditoria.Activo } });
  }
  obtenerPorId(id: number) {
    return prisma.tareas.findFirst({ where: { id_tarea: id, estado_auditoria: EstadoAuditoria.Activo } });
  }
  actualizar(id: number, data: ActualizarTareaDto) {
    return prisma.tareas.update({ where: { id_tarea: id }, data: { ...data, fecha_modificacion: new Date() } });
  }
  eliminar(id: number) {
    return prisma.tareas.update({ where: { id_tarea: id }, data: { estado_auditoria: EstadoAuditoria.Inactivo, fecha_modificacion: new Date() } });
  }
}

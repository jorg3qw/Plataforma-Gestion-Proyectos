import prisma from "../config/database";
import { CrearTipoTareaDto, ActualizarTipoTareaDto } from "../dtos/tipo_tarea.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class TipoTareaRepository {
  crearTipoTarea(data: CrearTipoTareaDto) {
    return prisma.tipos_tarea.create({ data });
  }

  obtenerTiposTarea() {
    return prisma.tipos_tarea.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo }
    });
  }

  obtenerTipoTareaPorId(id: number) {
    return prisma.tipos_tarea.findFirst({
      where: { id_tipo_tarea: id, estado_auditoria: EstadoAuditoria.Activo }
    });
  }

  actualizarTipoTarea(id: number, data: ActualizarTipoTareaDto) {
    return prisma.tipos_tarea.update({
      where: { id_tipo_tarea: id },
      data: {
        ...data,
        fecha_modificacion: new Date()
      }
    });
  }

  eliminarTipoTarea(id: number) {
    return prisma.tipos_tarea.update({
      where: { id_tipo_tarea: id },
      data: {
        estado_auditoria: EstadoAuditoria.Inactivo,
        fecha_modificacion: new Date()
      }
    });
  }
}

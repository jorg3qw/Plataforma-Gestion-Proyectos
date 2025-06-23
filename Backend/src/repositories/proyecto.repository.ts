// src/repositories/proyecto.repository.ts
import prisma from "../config/database";
import { CrearProyectoDto, ActualizarProyectoDto } from "../dtos/proyecto.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class ProyectoRepository {
  crearProyecto(data: CrearProyectoDto) {
    // Convertimos las cadenas ISO a Date
    const payload = {
      ...data,
      fecha_inicio: new Date(data.fecha_inicio),
      fecha_fin: data.fecha_fin ? new Date(data.fecha_fin) : undefined,
    };

    return prisma.proyectos.create({ data: payload });
  }

  obtenerProyectos() {
    return prisma.proyectos.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  obtenerProyectoPorId(id: number) {
    return prisma.proyectos.findFirst({
      where: { id_proyecto: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  actualizarProyecto(id: number, data: ActualizarProyectoDto) {
    // Para actualizar, también transformamos las fechas si vienen definidas
    const payload: any = {
      ...data,
      fecha_modificacion: new Date(),
    };
    if (data.fecha_inicio) payload.fecha_inicio = new Date(data.fecha_inicio);
    if (data.fecha_fin)    payload.fecha_fin    = new Date(data.fecha_fin);

    return prisma.proyectos.update({
      where: { id_proyecto: id },
      data: payload,
    });
  }

  eliminarProyecto(id: number) {
    return prisma.proyectos.update({
      where: { id_proyecto: id },
      data: {
        estado_auditoria: EstadoAuditoria.Inactivo,
        fecha_modificacion: new Date(),
      },
    });
  }
}

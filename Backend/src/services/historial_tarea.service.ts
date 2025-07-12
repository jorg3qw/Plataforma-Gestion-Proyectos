import prisma from "../config/database";
import { HistorialTareaRepository } from "../repositories/historial_tarea.repository";
import { CrearHistorialTareaDto, ActualizarHistorialTareaDto } from "../dtos/historial_tarea.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repo = new HistorialTareaRepository();

// Validaciones de FKs recurriendo a prisma
async function validarSiActivo(table: string, field: string, id?: number) {
  if (id == null) return;
  const row = await (prisma as any)[table].findFirst({
    where: { [field]: id, estado_auditoria: EstadoAuditoria.Activo },
  });
  if (!row) throw new Error(`${table} no encontrado`);
}

export class HistorialTareaService {
  async crear(data: CrearHistorialTareaDto) {
    await validarSiActivo("tareas", "id_tarea", data.id_tarea);
    await validarSiActivo("usuarios", "id_usuario", data.id_usuario);
    await validarSiActivo("estados", "id_estado", data.id_estado_anterior);
    await validarSiActivo("estados", "id_estado", data.id_estado_nuevo);
    await validarSiActivo("usuarios", "id_usuario", data.id_asignado_anterior);
    await validarSiActivo("usuarios", "id_usuario", data.id_asignado_nuevo);
    return repo.crear(data);
  }
  async obtenerTodos() { return repo.obtenerTodos(); }
  async obtenerPorId(id: number) { return repo.obtenerPorId(id); }
  async actualizar(id: number, data: ActualizarHistorialTareaDto) {
    await validarSiActivo("tareas", "id_tarea", data.id_tarea);
    // demás validaciones idénticas a crear...
    return repo.actualizar(id, data);
  }
  async eliminar(id: number) { return repo.eliminar(id); }
}

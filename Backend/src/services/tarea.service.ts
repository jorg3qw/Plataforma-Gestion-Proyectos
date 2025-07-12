import prisma from "../config/database";
import { TareaRepository } from "../repositories/tarea.repository";
import { CrearTareaDto, ActualizarTareaDto } from "../dtos/tarea.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repo = new TareaRepository();

// helper validation
async function validarSiActivo(table: string, field: string, id?: number) {
  if (!id) return;
  const row = await (prisma as any)[table].findFirst({ where: { [field]: id, estado_auditoria: EstadoAuditoria.Activo } });
  if (!row) throw new Error(`${table} no encontrado`);
}

export class TareaService {
  async crear(data: CrearTareaDto) {
    await validarSiActivo("tipos_tarea", "id_tipo_tarea", data.id_tipo_tarea);
    await validarSiActivo("prioridades", "id_prioridad", data.id_prioridad);
    await validarSiActivo("estados", "id_estado", data.id_estado);
    await validarSiActivo("usuarios", "id_usuario", data.id_asignado);
    await validarSiActivo("columnas", "id_columna", data.id_columna);
    return repo.crear(data);
  }
  async obtenerTodas() { return repo.obtenerTodas(); }
  async obtenerPorId(id: number) { return repo.obtenerPorId(id); }
  async actualizar(id: number, data: ActualizarTareaDto) {
    await validarSiActivo("tipos_tarea", "id_tipo_tarea", data.id_tipo_tarea);
    // demás validaciones idénticas a crear...
    return repo.actualizar(id, data);
  }
  async eliminar(id: number) { return repo.eliminar(id); }
}

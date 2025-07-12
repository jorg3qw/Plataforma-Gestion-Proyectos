import prisma from "../config/database";
import { TareaEtiquetaRepository } from "../repositories/tarea_etiqueta.repository";
import { CrearTareaEtiquetaDto } from "../dtos/tarea_etiqueta.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repo = new TareaEtiquetaRepository();

export class TareaEtiquetaService {
  async crear(data: CrearTareaEtiquetaDto) {
    // validar tarea y etiqueta
    const t = await prisma.tareas.findFirst({ where: { id_tarea: data.id_tarea, estado_auditoria: EstadoAuditoria.Activo } });
    if (!t) throw new Error("Tarea no encontrada");
    const e = await prisma.etiquetas.findFirst({ where: { id_etiqueta: data.id_etiqueta, estado_auditoria: EstadoAuditoria.Activo } });
    if (!e) throw new Error("Etiqueta no encontrada");
    return repo.crear(data);
  }
  async obtenerTodos() { return repo.obtenerTodos(); }
  async eliminar(id_tarea: number, id_etiqueta: number) { return repo.eliminar(id_tarea, id_etiqueta); }
}

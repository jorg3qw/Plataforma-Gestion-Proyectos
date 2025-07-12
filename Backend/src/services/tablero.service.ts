import prisma from "../config/database";
import { TableroRepository } from "../repositories/tablero.repository";
import { CrearTableroDto, ActualizarTableroDto } from "../dtos/tablero.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repo = new TableroRepository();

export class TableroService {
  private async validarProyecto(id?: number) {
    if (!id) return;
    const p = await prisma.proyectos.findFirst({ where: { id_proyecto: id, estado_auditoria: EstadoAuditoria.Activo } });
    if (!p) throw new Error("Proyecto no encontrado");
  }
  async crear(data: CrearTableroDto) {
    await this.validarProyecto(data.id_proyecto);
    return repo.crear(data);
  }
  async obtenerTodos() { return repo.obtenerTodos(); }
  async obtenerPorId(id: number) { return repo.obtenerPorId(id); }
  async actualizar(id: number, data: ActualizarTableroDto) {
    await this.validarProyecto(data.id_proyecto);
    return repo.actualizar(id, data);
  }
  async eliminar(id: number) { return repo.eliminar(id); }
}

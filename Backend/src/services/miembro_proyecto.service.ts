import prisma from "../config/database";
import { MiembroProyectoRepository } from "../repositories/miembro_proyecto.repository";
import { CrearMiembroProyectoDto } from "../dtos/miembro_proyecto.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repo = new MiembroProyectoRepository();

export class MiembroProyectoService {
  async crear(data: CrearMiembroProyectoDto) {
    // validar existencia de proyecto y usuario
    const p = await prisma.proyectos.findFirst({ where: { id_proyecto: data.id_proyecto, estado_auditoria: EstadoAuditoria.Activo } });
    if (!p) throw new Error("Proyecto no encontrado");
    const u = await prisma.usuarios.findFirst({ where: { id_usuario: data.id_usuario, estado_auditoria: EstadoAuditoria.Activo } });
    if (!u) throw new Error("Usuario no encontrado");
    return repo.crear(data);
  }
  async obtenerTodos() { return repo.obtenerTodos(); }
  async obtenerPorId(proyecto: number, usuario: number) { return repo.obtenerPorId(proyecto, usuario); }
  async eliminar(proyecto: number, usuario: number) { return repo.eliminar(proyecto, usuario); }
}

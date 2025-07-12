import prisma from "../config/database";
import { ComentarioRepository } from "../repositories/comentario.repository";
import { CrearComentarioDto, ActualizarComentarioDto } from "../dtos/comentario.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repo = new ComentarioRepository();

export class ComentarioService {
  private async validarTarea(id_tarea?: number) {
    if (!id_tarea) return;
    const t = await prisma.tareas.findFirst({ where: { id_tarea, estado_auditoria: EstadoAuditoria.Activo } });
    if (!t) throw new Error("Tarea no encontrada");
  }
  private async validarUsuario(id_usuario?: number) {
    if (!id_usuario) return;
    const u = await prisma.usuarios.findFirst({ where: { id_usuario, estado_auditoria: EstadoAuditoria.Activo } });
    if (!u) throw new Error("Usuario no encontrado");
  }
  async crearComentario(data: CrearComentarioDto) {
    await this.validarTarea(data.id_tarea);
    await this.validarUsuario(data.id_usuario);
    return repo.crearComentario(data);
  }
  async obtenerComentarios() { return repo.obtenerComentarios(); }
  async obtenerComentarioPorId(id: number) { return repo.obtenerComentarioPorId(id); }
  async actualizarComentario(id: number, data: ActualizarComentarioDto) {
    await this.validarTarea(data.id_tarea);
    await this.validarUsuario(data.id_usuario);
    return repo.actualizarComentario(id, data);
  }
  async eliminarComentario(id: number) { return repo.eliminarComentario(id); }
}

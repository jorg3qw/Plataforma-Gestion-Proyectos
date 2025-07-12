import prisma from "../config/database";
import { ActividadRepository } from "../repositories/actividad.repository";
import { CrearActividadDto, ActualizarActividadDto } from "../dtos/actividad.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repo = new ActividadRepository();

export class ActividadService {
  private async validarTarea(id_tarea?: number) {
    if (id_tarea == null) return;
    const tarea = await prisma.tareas.findFirst({
      where: { id_tarea, estado_auditoria: EstadoAuditoria.Activo },
    });
    if (!tarea) throw new Error("Tarea no encontrada");
  }
  private async validarUsuario(id_usuario?: number) {
    if (id_usuario == null) return;
    const usuario = await prisma.usuarios.findFirst({
      where: { id_usuario, estado_auditoria: EstadoAuditoria.Activo },
    });
    if (!usuario) throw new Error("Usuario no encontrado");
  }

  async crearActividad(data: CrearActividadDto) {
    await this.validarTarea(data.id_tarea);
    await this.validarUsuario(data.id_usuario);
    return repo.crearActividad(data);
  }
  async obtenerActividades() {
    return repo.obtenerActividades();
  }
  async obtenerActividadPorId(id: number) {
    return repo.obtenerActividadPorId(id);
  }
  async actualizarActividad(id: number, data: ActualizarActividadDto) {
    await this.validarTarea(data.id_tarea);
    await this.validarUsuario(data.id_usuario);
    return repo.actualizarActividad(id, data);
  }
  async eliminarActividad(id: number) {
    return repo.eliminarActividad(id);
  }
}

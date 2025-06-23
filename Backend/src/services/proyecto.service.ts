import prisma from "../config/database";
import { ProyectoRepository } from "../repositories/proyecto.repository";
import { CrearProyectoDto, ActualizarProyectoDto } from "../dtos/proyecto.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repository = new ProyectoRepository();

export class ProyectoService {
  /** Asegura que el propietario exista y esté Activo */
  private async validarPropietario(id_propietario?: number) {
    if (id_propietario == null) return;
    const usuario = await prisma.usuarios.findFirst({
      where: { id_usuario: id_propietario, estado_auditoria: EstadoAuditoria.Activo },
    });
    if (!usuario) throw new Error("Propietario no encontrado");
  }

  /** Asegura que el estado exista y esté Activo */
  private async validarEstado(id_estado?: number) {
    if (id_estado == null) return;
    const estado = await prisma.estados.findFirst({
      where: { id_estado, estado_auditoria: EstadoAuditoria.Activo },
    });
    if (!estado) throw new Error("Estado no encontrado");
  }

  async crearProyecto(data: CrearProyectoDto) {
    await this.validarPropietario(data.id_propietario);
    await this.validarEstado(data.id_estado);
    return repository.crearProyecto(data);
  }

  async obtenerProyectos() {
    return repository.obtenerProyectos();
  }

  async obtenerProyectoPorId(id: number) {
    return repository.obtenerProyectoPorId(id);
  }

  async actualizarProyecto(id: number, data: ActualizarProyectoDto) {
    if (data.id_propietario !== undefined) {
      await this.validarPropietario(data.id_propietario);
    }
    if (data.id_estado !== undefined) {
      await this.validarEstado(data.id_estado);
    }
    return repository.actualizarProyecto(id, data);
  }

  async eliminarProyecto(id: number) {
    return repository.eliminarProyecto(id);
  }
}

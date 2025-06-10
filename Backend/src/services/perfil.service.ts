import { PerfilRepository } from "../repositories/perfil.repository";
import { CrearPerfilDto, ActualizarPerfilDto } from "../dtos/perfil.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repository = new PerfilRepository();

export class PerfilService {
  async crearPerfil(data: CrearPerfilDto) {
    const perfilConEstado = {
      ...data,
      estado_auditoria: EstadoAuditoria.Activo,
    };
    return repository.crearPerfil(perfilConEstado);
  }

  async obtenerPerfiles() {
    return repository.obtenerPerfiles();
  }

  async obtenerPerfilPorId(id: number) {
    return repository.obtenerPerfilPorId(id);
  }

  async actualizarPerfil(id: number, data: ActualizarPerfilDto) {
    return repository.actualizarPerfil(id, data);
  }

  async eliminarPerfil(id: number) {
    return repository.eliminarPerfil(id);
  }
}

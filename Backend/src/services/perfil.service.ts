import { PerfilRepository } from "../repositories/perfil.repository";
import { CrearPerfilDto, ActualizarPerfilDto } from "../dtos/perfil.dto";

const repository = new PerfilRepository();

export class PerfilService {
  async crearPerfil(data: CrearPerfilDto) {
    return repository.crearPerfil(data);
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

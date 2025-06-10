import { EstadoRepository } from "../repositories/estado.repository";
import { CrearEstadoDto, ActualizarEstadoDto } from "../dtos/estado.dto";

const repository = new EstadoRepository();

export class EstadoService {
  async crearEstado(data: CrearEstadoDto) {
    return repository.crearEstado(data);
  }
  async obtenerEstados() {
    return repository.obtenerEstados();
  }
  async obtenerEstadoPorId(id: number) {
    return repository.obtenerEstadoPorId(id);
  }
  async actualizarEstado(id: number, data: ActualizarEstadoDto) {
    return repository.actualizarEstado(id, data);
  }
  async eliminarEstado(id: number) {
    return repository.eliminarEstado(id);
  }
}

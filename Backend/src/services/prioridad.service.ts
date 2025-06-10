import { PrioridadRepository } from "../repositories/prioridad.repository";
import { CrearPrioridadDto, ActualizarPrioridadDto } from "../dtos/prioridad.dto";

const repository = new PrioridadRepository();

export class PrioridadService {
  async crearPrioridad(data: CrearPrioridadDto) {
    return repository.crearPrioridad(data);
  }

  async obtenerPrioridades() {
    return repository.obtenerPrioridades();
  }

  async obtenerPrioridadPorId(id: number) {
    return repository.obtenerPrioridadPorId(id);
  }

  async actualizarPrioridad(id: number, data: ActualizarPrioridadDto) {
    return repository.actualizarPrioridad(id, data);
  }

  async eliminarPrioridad(id: number) {
    return repository.eliminarPrioridad(id);
  }
}

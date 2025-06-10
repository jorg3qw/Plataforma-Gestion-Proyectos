import { PrioridadRepository } from "../repositories/prioridad.repository";
import { CrearPrioridadDto, ActualizarPrioridadDto } from "../dtos/prioridad.dto";

const repository = new PrioridadRepository();

export class PrioridadService {
  async crearPrioridad(data: CrearPrioridadDto) {
    return repository.crear(data);
  }

  async obtenerTodas() {
    return repository.obtenerTodos();
  }

  async obtenerPorId(id: number) {
    return repository.obtenerPorId(id);
  }

  async actualizarPrioridad(id: number, data: ActualizarPrioridadDto) {
    return repository.actualizar(id, data);
  }

  async eliminarPrioridad(id: number) {
    return repository.eliminar(id);
  }
}
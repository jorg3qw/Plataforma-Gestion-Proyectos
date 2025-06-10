import { TipoTareaRepository } from "../repositories/tipo_tarea.repository";
import { CrearTipoTareaDto, ActualizarTipoTareaDto } from "../dtos/tipo_tarea.dto";

const repository = new TipoTareaRepository();

export class TipoTareaService {
  async crearTipoTarea(data: CrearTipoTareaDto) {
    return repository.crearTipoTarea(data);
  }
  async obtenerTiposTarea() {
    return repository.obtenerTiposTarea();
  }
  async obtenerTipoTareaPorId(id: number) {
    return repository.obtenerTipoTareaPorId(id);
  }
  async actualizarTipoTarea(id: number, data: ActualizarTipoTareaDto) {
    return repository.actualizarTipoTarea(id, data);
  }
  async eliminarTipoTarea(id: number) {
    return repository.eliminarTipoTarea(id);
  }
}

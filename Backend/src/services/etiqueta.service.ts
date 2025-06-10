import { EtiquetaRepository } from "../repositories/etiqueta.repository";
import { CrearEtiquetaDto, ActualizarEtiquetaDto } from "../dtos/etiqueta.dto";

const repository = new EtiquetaRepository();

export class EtiquetaService {
  async crearEtiqueta(data: CrearEtiquetaDto) {
    return repository.crearEtiqueta(data);
  }

  async obtenerEtiquetas() {
    return repository.obtenerEtiquetas();
  }

  async obtenerEtiquetaPorId(id: number) {
    return repository.obtenerEtiquetaPorId(id);
  }

  async actualizarEtiqueta(id: number, data: ActualizarEtiquetaDto) {
    return repository.actualizarEtiqueta(id, data);
  }

  async eliminarEtiqueta(id: number) {
    return repository.eliminarEtiqueta(id);
  }
}

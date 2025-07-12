import prisma from "../config/database";
import { ColumnaRepository } from "../repositories/columna.repository";
import { CrearColumnaDto, ActualizarColumnaDto } from "../dtos/columna.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

const repository = new ColumnaRepository();

export class ColumnaService {
  /** Asegura que id_tablero (si viene) exista y esté Activo */
  private async validarTablero(id_tablero?: number) {
    if (id_tablero == null) return;
    const tablero = await prisma.tableros.findFirst({
      where: { id_tablero, estado_auditoria: EstadoAuditoria.Activo },
    });
    if (!tablero) throw new Error("Tablero no encontrado");
  }

  async crearColumna(data: CrearColumnaDto) {
    await this.validarTablero(data.id_tablero);
    return repository.crearColumna(data);
  }

  async obtenerColumnas() {
    return repository.obtenerColumnas();
  }

  async obtenerColumnaPorId(id: number) {
    return repository.obtenerColumnaPorId(id);
  }

  async actualizarColumna(id: number, data: ActualizarColumnaDto) {
    if (data.id_tablero !== undefined) {
      await this.validarTablero(data.id_tablero);
    }
    return repository.actualizarColumna(id, data);
  }

  async eliminarColumna(id: number) {
    return repository.eliminarColumna(id);
  }
}

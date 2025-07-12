import prisma from "../config/database";
import { CrearColumnaDto, ActualizarColumnaDto } from "../dtos/columna.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class ColumnaRepository {
  crearColumna(data: CrearColumnaDto) {
    return prisma.columnas.create({ data });
  }

  obtenerColumnas() {
    return prisma.columnas.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  obtenerColumnaPorId(id: number) {
    return prisma.columnas.findFirst({
      where: { id_columna: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  actualizarColumna(id: number, data: ActualizarColumnaDto) {
    return prisma.columnas.update({
      where: { id_columna: id },
      data: {
        ...data,
        fecha_modificacion: new Date(),
      },
    });
  }

  eliminarColumna(id: number) {
    return prisma.columnas.update({
      where: { id_columna: id },
      data: {
        estado_auditoria: EstadoAuditoria.Inactivo,
        fecha_modificacion: new Date(),
      },
    });
  }
}

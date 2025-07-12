import prisma from "../config/database";
import { CrearTableroDto, ActualizarTableroDto } from "../dtos/tablero.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class TableroRepository {
  crear(data: CrearTableroDto) {
    return prisma.tableros.create({ data });
  }
  obtenerTodos() {
    return prisma.tableros.findMany({ where: { estado_auditoria: EstadoAuditoria.Activo } });
  }
  obtenerPorId(id: number) {
    return prisma.tableros.findFirst({ where: { id_tablero: id, estado_auditoria: EstadoAuditoria.Activo } });
  }
  actualizar(id: number, data: ActualizarTableroDto) {
    return prisma.tableros.update({ where: { id_tablero: id }, data: { ...data, fecha_modificacion: new Date() } });
  }
  eliminar(id: number) {
    return prisma.tableros.update({ where: { id_tablero: id }, data: { estado_auditoria: EstadoAuditoria.Inactivo, fecha_modificacion: new Date() } });
  }
}

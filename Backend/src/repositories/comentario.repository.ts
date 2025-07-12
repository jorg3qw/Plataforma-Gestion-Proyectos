import prisma from "../config/database";
import { CrearComentarioDto, ActualizarComentarioDto } from "../dtos/comentario.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class ComentarioRepository {
  crearComentario(data: CrearComentarioDto) {
    return prisma.comentarios.create({ data });
  }
  obtenerComentarios() {
    return prisma.comentarios.findMany({ where: { estado_auditoria: EstadoAuditoria.Activo } });
  }
  obtenerComentarioPorId(id: number) {
    return prisma.comentarios.findFirst({ where: { id_comentario: id, estado_auditoria: EstadoAuditoria.Activo } });
  }
  actualizarComentario(id: number, data: ActualizarComentarioDto) {
    return prisma.comentarios.update({ where: { id_comentario: id }, data: { ...data, fecha_modificacion: new Date() } });
  }
  eliminarComentario(id: number) {
    return prisma.comentarios.update({ where: { id_comentario: id }, data: { estado_auditoria: EstadoAuditoria.Inactivo, fecha_modificacion: new Date() } });
  }
}

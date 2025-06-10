import prisma from "../config/database";
import { CrearEtiquetaDto, ActualizarEtiquetaDto } from "../dtos/etiqueta.dto";
import { EstadoAuditoria } from "../utils/estado.enum";

export class EtiquetaRepository {
  crearEtiqueta(data: CrearEtiquetaDto) {
    return prisma.etiquetas.create({ data });
  }

  obtenerEtiquetas() {
    return prisma.etiquetas.findMany({
      where: { estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  obtenerEtiquetaPorId(id: number) {
    return prisma.etiquetas.findFirst({
      where: { id_etiqueta: id, estado_auditoria: EstadoAuditoria.Activo },
    });
  }

  actualizarEtiqueta(id: number, data: ActualizarEtiquetaDto) {
    return prisma.etiquetas.update({
      where: { id_etiqueta: id },
      data: {
        ...data,
        fecha_modificacion: new Date(),
      },
    });
  }

  eliminarEtiqueta(id: number) {
    return prisma.etiquetas.update({
      where: { id_etiqueta: id },
      data: {
        estado_auditoria: EstadoAuditoria.Inactivo,
        fecha_modificacion: new Date(),
      },
    });
  }
}

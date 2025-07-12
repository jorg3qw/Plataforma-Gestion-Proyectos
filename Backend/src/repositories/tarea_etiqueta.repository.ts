import prisma from "../config/database";
import { CrearTareaEtiquetaDto } from "../dtos/tarea_etiqueta.dto";
//import { EstadoAuditoria } from "../utils/estado.enum";

export class TareaEtiquetaRepository {
  crear(data: CrearTareaEtiquetaDto) {
    return prisma.tarea_etiqueta.create({ data });
  }
  obtenerTodos() {
    return prisma.tarea_etiqueta.findMany();
  }
  eliminar(id_tarea: number, id_etiqueta: number) {
    return prisma.tarea_etiqueta.delete({
      where: { id_tarea_id_etiqueta: { id_tarea, id_etiqueta } },
    });
  }
}

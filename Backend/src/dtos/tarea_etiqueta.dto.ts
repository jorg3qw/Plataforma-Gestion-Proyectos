import { z } from "zod";

export const crearTareaEtiquetaSchema = z.object({
  id_tarea:    z.number(),
  id_etiqueta: z.number(),
});

export type CrearTareaEtiquetaDto = z.infer<typeof crearTareaEtiquetaSchema>;

import { z } from "zod";

const tareaBaseSchema = z.object({
  clave:        z.string().optional(),
  resumen:      z.string().min(1, "El resumen es obligatorio"),
  descripcion:  z.string().min(1, "La descripción es obligatoria"),
  id_tipo_tarea:z.number().optional(),
  id_prioridad: z.number().optional(),
  id_estado:    z.number().optional(),
  id_asignado:  z.number().optional(),
  id_columna:   z.number().optional(),
});

export const crearTareaSchema    = tareaBaseSchema;
export const actualizarTareaSchema = tareaBaseSchema.partial();

export type CrearTareaDto    = z.infer<typeof crearTareaSchema>;
export type ActualizarTareaDto = z.infer<typeof actualizarTareaSchema>;

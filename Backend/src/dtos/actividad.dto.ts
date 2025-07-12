import { z } from "zod";

export const crearActividadSchema = z.object({
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  id_tarea:    z.number().optional(),
  id_usuario:  z.number().optional(),
});

export const actualizarActividadSchema = crearActividadSchema.partial();

export type CrearActividadDto    = z.infer<typeof crearActividadSchema>;
export type ActualizarActividadDto = z.infer<typeof actualizarActividadSchema>;

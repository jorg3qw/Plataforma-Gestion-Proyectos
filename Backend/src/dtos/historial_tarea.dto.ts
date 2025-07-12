import { z } from "zod";

export const crearHistorialTareaSchema = z.object({
  id_tarea:              z.number().optional(),
  id_usuario:            z.number().optional(),
  id_estado_anterior:    z.number().optional(),
  id_estado_nuevo:       z.number().optional(),
  id_asignado_anterior:  z.number().optional(),
  id_asignado_nuevo:     z.number().optional(),
});

export const actualizarHistorialTareaSchema = crearHistorialTareaSchema.partial();

export type CrearHistorialTareaDto    = z.infer<typeof crearHistorialTareaSchema>;
export type ActualizarHistorialTareaDto = z.infer<typeof actualizarHistorialTareaSchema>;

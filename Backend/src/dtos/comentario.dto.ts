import { z } from "zod";

export const crearComentarioSchema = z.object({
  texto:     z.string().min(1, "El texto es obligatorio"),
  id_tarea:  z.number().optional(),
  id_usuario:z.number().optional(),
});
export const actualizarComentarioSchema = crearComentarioSchema.partial();

export type CrearComentarioDto    = z.infer<typeof crearComentarioSchema>;
export type ActualizarComentarioDto = z.infer<typeof actualizarComentarioSchema>;

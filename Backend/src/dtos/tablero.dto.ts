import { z } from "zod";

const tableroBaseSchema = z.object({
  nombre:        z.string().min(1, "El nombre es obligatorio"),
  descripcion:   z.string().optional(),
  id_proyecto:   z.number().optional(),
});

export const crearTableroSchema    = tableroBaseSchema;
export const actualizarTableroSchema = tableroBaseSchema.partial();

export type CrearTableroDto    = z.infer<typeof crearTableroSchema>;
export type ActualizarTableroDto = z.infer<typeof actualizarTableroSchema>;

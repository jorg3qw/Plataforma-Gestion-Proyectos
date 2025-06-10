import { z } from "zod";

export const crearEstadoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "Máximo 50 caracteres"),
  descripcion: z.string().optional(),
});

export const actualizarEstadoSchema = crearEstadoSchema.partial();

export type CrearEstadoDto = z.infer<typeof crearEstadoSchema>;
export type ActualizarEstadoDto = z.infer<typeof actualizarEstadoSchema>;

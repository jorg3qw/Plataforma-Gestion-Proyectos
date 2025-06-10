import { z } from "zod";

export const crearPrioridadSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "Máximo 50 caracteres"),
  descripcion: z.string().optional(),
});

export const actualizarPrioridadSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "Máximo 50 caracteres").optional(),
  descripcion: z.string().optional(),
});

export type CrearPrioridadDto = z.infer<typeof crearPrioridadSchema>;
export type ActualizarPrioridadDto = z.infer<typeof actualizarPrioridadSchema>;

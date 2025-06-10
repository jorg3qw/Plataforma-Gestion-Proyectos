import { z } from "zod";

export const crearPerfilSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "Máximo 50 caracteres"),
  descripcion: z.string().optional(),
});

export const actualizarPerfilSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "Máximo 50 caracteres").optional(),
  descripcion: z.string().optional(),
});

export type CrearPerfilDto = z.infer<typeof crearPerfilSchema>;
export type ActualizarPerfilDto = z.infer<typeof actualizarPerfilSchema>;

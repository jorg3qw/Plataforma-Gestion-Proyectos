import { z } from "zod";

export const crearTipoTareaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "Máximo 50 caracteres"),
  descripcion: z.string().optional(),
});

export const actualizarTipoTareaSchema = crearTipoTareaSchema.partial();

export type CrearTipoTareaDto = z.infer<typeof crearTipoTareaSchema>;
export type ActualizarTipoTareaDto = z.infer<typeof actualizarTipoTareaSchema>;

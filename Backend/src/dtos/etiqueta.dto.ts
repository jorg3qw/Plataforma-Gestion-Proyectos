import { z } from "zod";

export const crearEtiquetaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "Máximo 50 caracteres"),
  color: z.string().length(7, "Debe ser un color HEX válido, ej: #ff0000"),
});

export const actualizarEtiquetaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(50, "Máximo 50 caracteres").optional(),
  color: z.string().length(7, "Debe ser un color HEX válido").optional(),
});

export type CrearEtiquetaDto = z.infer<typeof crearEtiquetaSchema>;
export type ActualizarEtiquetaDto = z.infer<typeof actualizarEtiquetaSchema>;

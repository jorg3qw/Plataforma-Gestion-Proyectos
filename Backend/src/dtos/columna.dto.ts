import { z } from "zod";

const columnaBaseSchema = z.object({
  nombre:       z.string().min(1, "El nombre es obligatorio"),
  posicion:     z.number().int().min(0, "La posición debe ser un entero >= 0"),
  id_tablero:   z.number().optional(),
});

export const crearColumnaSchema    = columnaBaseSchema;
export const actualizarColumnaSchema = columnaBaseSchema.partial();

export type CrearColumnaDto    = z.infer<typeof crearColumnaSchema>;
export type ActualizarColumnaDto = z.infer<typeof actualizarColumnaSchema>;

import { z } from "zod";

/**
 * Esquema base con todos los campos necesarios para crear un proyecto.
 */
const proyectoBaseSchema = z.object({
  codigo:         z.string().min(1, "El código es obligatorio"),
  nombre:         z.string().min(1, "El nombre es obligatorio"),
  descripcion:    z.string().optional(),
  fecha_inicio:   z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "La fecha de inicio no es válida",
  }),
  fecha_fin:      z.string().optional().refine(
    val => val === undefined || !isNaN(Date.parse(val)),
    { message: "La fecha de fin no es válida" }
  ),
  id_propietario: z.number().optional(),
  id_estado:      z.number().optional(),
});

export const crearProyectoSchema = proyectoBaseSchema;
export const actualizarProyectoSchema = proyectoBaseSchema.partial();

export type CrearProyectoDto = z.infer<typeof crearProyectoSchema>;
export type ActualizarProyectoDto = z.infer<typeof actualizarProyectoSchema>;

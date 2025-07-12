import { z } from "zod";

export const crearMiembroProyectoSchema = z.object({
  id_proyecto: z.number(),
  id_usuario:  z.number(),
  rol:         z.string().optional(),
});

export type CrearMiembroProyectoDto = z.infer<typeof crearMiembroProyectoSchema>;

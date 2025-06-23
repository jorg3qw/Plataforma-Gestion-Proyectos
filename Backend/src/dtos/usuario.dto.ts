import { z } from "zod";

/**
 * Esquema base con todos los campos necesarios para crear un usuario.
 */
const usuarioBaseSchema = z.object({
  nombre:           z.string().min(1, "El nombre es obligatorio"),
  apellido_paterno: z.string().min(1, "El apellido paterno es obligatorio"),
  apellido_materno: z.string().optional(),
  nombre_usuario:   z.string().min(1, "El nombre de usuario es obligatorio"),
  correo:           z.string().email("Correo inválido"),
  contrasena:       z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  id_perfil:        z.number().optional(),
});

export const crearUsuarioSchema = usuarioBaseSchema;
export const actualizarUsuarioSchema = usuarioBaseSchema.partial();

export type CrearUsuarioDto    = z.infer<typeof crearUsuarioSchema>;
export type ActualizarUsuarioDto = z.infer<typeof actualizarUsuarioSchema>;

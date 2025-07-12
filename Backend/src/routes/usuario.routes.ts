import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearUsuarioSchema, actualizarUsuarioSchema } from "../dtos/usuario.dto";

const router = Router();
const ctrl = new UsuarioController();

/**
 * @openapi
 * tags:
 *   - name: Usuarios
 *     description: CRUD de usuarios
 *
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *         nombre:
 *           type: string
 *         apellido_paterno:
 *           type: string
 *         apellido_materno:
 *           type: string
 *         nombre_usuario:
 *           type: string
 *         correo:
 *           type: string
 *           format: email
 *         id_perfil:
 *           type: integer
 *     CrearUsuario:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido_paterno
 *         - nombre_usuario
 *         - correo
 *         - contrasena
 *       properties:
 *         nombre:
 *           type: string
 *         apellido_paterno:
 *           type: string
 *         apellido_materno:
 *           type: string
 *         nombre_usuario:
 *           type: string
 *         correo:
 *           type: string
 *           format: email
 *         contrasena:
 *           type: string
 *         id_perfil:
 *           type: integer
 *     ActualizarUsuario:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         apellido_paterno:
 *           type: string
 *         apellido_materno:
 *           type: string
 *         nombre_usuario:
 *           type: string
 *         correo:
 *           type: string
 *         contrasena:
 *           type: string
 *         id_perfil:
 *           type: integer
 */

/**
 * @openapi
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearUsuario'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarUsuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *   delete:
 *     summary: Eliminar un usuario (soft delete)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */

router.get("/", catchErrors(ctrl.obtenerUsuarios.bind(ctrl)));
router.post("/", validarDatos(crearUsuarioSchema), catchErrors(ctrl.crearUsuario.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerUsuarioPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarUsuarioSchema), catchErrors(ctrl.actualizarUsuario.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarUsuario.bind(ctrl)));

export default router;

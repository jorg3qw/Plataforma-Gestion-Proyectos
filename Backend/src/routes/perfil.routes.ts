import { Router } from "express";
import { PerfilController } from "../controllers/perfil.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearPerfilSchema, actualizarPerfilSchema } from "../dtos/perfil.dto";

const router = Router();
const ctrl = new PerfilController();

/**
 * @openapi
 * tags:
 *   - name: Perfil
 *     description: CRUD de perfiles
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Perfil:
 *       type: object
 *       properties:
 *         id_perfil:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     CrearPerfil:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     ActualizarPerfil:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 */

/**
 * @openapi
 * /perfiles:
 *   get:
 *     summary: Listar todos los perfiles
 *     tags: [Perfil]
 *     responses:
 *       200:
 *         description: Array de perfiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Perfil'
 *   post:
 *     summary: Crear un nuevo perfil
 *     tags: [Perfil]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearPerfil'
 *     responses:
 *       201:
 *         description: Perfil creado correctamente
 */

/**
 * @openapi
 * /perfiles/{id}:
 *   get:
 *     summary: Obtener un perfil por ID
 *     tags: [Perfil]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       404:
 *         description: Perfil no encontrado
 *   put:
 *     summary: Actualizar un perfil existente
 *     tags: [Perfil]
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
 *             $ref: '#/components/schemas/ActualizarPerfil'
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *   delete:
 *     summary: Eliminar un perfil (soft delete)
 *     tags: [Perfil]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Perfil eliminado correctamente
 */

router.get("/", catchErrors(ctrl.obtenerPerfiles.bind(ctrl)));
router.post("/", validarDatos(crearPerfilSchema), catchErrors(ctrl.crearPerfil.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerPerfilPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarPerfilSchema), catchErrors(ctrl.actualizarPerfil.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarPerfil.bind(ctrl)));

export default router;

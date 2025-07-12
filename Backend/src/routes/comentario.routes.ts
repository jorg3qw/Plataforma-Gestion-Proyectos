import { Router } from "express";
import { ComentarioController } from "../controllers/comentario.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearComentarioSchema, actualizarComentarioSchema } from "../dtos/comentario.dto";

const router = Router();
const ctrl = new ComentarioController();

/**
 * @openapi
 * tags:
 *   - name: Comentarios
 *     description: CRUD de comentarios
 *
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       properties:
 *         id_comentario:
 *           type: integer
 *         id_tarea:
 *           type: integer
 *           nullable: true
 *         id_usuario:
 *           type: integer
 *           nullable: true
 *         texto:
 *           type: string
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *     CrearComentario:
 *       type: object
 *       required:
 *         - texto
 *       properties:
 *         id_tarea:
 *           type: integer
 *         id_usuario:
 *           type: integer
 *         texto:
 *           type: string
 *     ActualizarComentario:
 *       type: object
 *       properties:
 *         texto:
 *           type: string
 */

/**
 * @openapi
 * /comentarios:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags: [Comentarios]
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearComentario'
 *     responses:
 *       201:
 *         description: Comentario creado correctamente
 *
 * /comentarios/{id}:
 *   get:
 *     summary: Obtener comentario por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *       404:
 *         description: No encontrado
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comentarios]
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
 *             $ref: '#/components/schemas/ActualizarComentario'
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *   delete:
 *     summary: Eliminar un comentario (soft delete)
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Comentario eliminado
 */

router.post("/", validarDatos(crearComentarioSchema), catchErrors(ctrl.crearComentario.bind(ctrl)));
router.get("/", catchErrors(ctrl.obtenerComentarios.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerComentarioPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarComentarioSchema), catchErrors(ctrl.actualizarComentario.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarComentario.bind(ctrl)));

export default router;

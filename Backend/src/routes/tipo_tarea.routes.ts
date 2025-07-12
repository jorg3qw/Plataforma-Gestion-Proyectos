import { Router } from "express";
import { TipoTareaController } from "../controllers/tipo_tarea.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearTipoTareaSchema, actualizarTipoTareaSchema } from "../dtos/tipo_tarea.dto";

const router = Router();
const ctrl = new TipoTareaController();

/**
 * @openapi
 * tags:
 *   - name: TiposTarea
 *     description: CRUD de tipos de tarea
 *
 * components:
 *   schemas:
 *     TipoTarea:
 *       type: object
 *       properties:
 *         id_tipo_tarea:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     CrearTipoTarea:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     ActualizarTipoTarea:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 */

/**
 * @openapi
 * /tipos-tarea:
 *   get:
 *     summary: Obtener todos los tipos de tarea
 *     tags: [TiposTarea]
 *     responses:
 *       200:
 *         description: Lista de tipos de tarea
 *   post:
 *     summary: Crear un nuevo tipo de tarea
 *     tags: [TiposTarea]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearTipoTarea'
 *     responses:
 *       201:
 *         description: Tipo de tarea creado correctamente
 *
 * /tipos-tarea/{id}:
 *   get:
 *     summary: Obtener un tipo de tarea por ID
 *     tags: [TiposTarea]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Tipo de tarea encontrado
 *       404:
 *         description: Tipo de tarea no encontrado
 *   put:
 *     summary: Actualizar un tipo de tarea
 *     tags: [TiposTarea]
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
 *             $ref: '#/components/schemas/ActualizarTipoTarea'
 *     responses:
 *       200:
 *         description: Tipo de tarea actualizado correctamente
 *   delete:
 *     summary: Eliminar un tipo de tarea (soft delete)
 *     tags: [TiposTarea]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Tipo de tarea eliminado correctamente
 */

router.get("/", catchErrors(ctrl.obtenerTiposTarea.bind(ctrl)));
router.post("/", validarDatos(crearTipoTareaSchema), catchErrors(ctrl.crearTipoTarea.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerTipoTareaPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarTipoTareaSchema), catchErrors(ctrl.actualizarTipoTarea.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarTipoTarea.bind(ctrl)));

export default router;

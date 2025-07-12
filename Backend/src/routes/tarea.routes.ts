import { Router } from "express";
import { TareaController } from "../controllers/tarea.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearTareaSchema, actualizarTareaSchema } from "../dtos/tarea.dto";

const router = Router();
const ctrl = new TareaController();

/**
 * @openapi
 * tags:
 *   - name: Tareas
 *     description: CRUD de tareas
 *
 * components:
 *   schemas:
 *     Tarea:
 *       type: object
 *       properties:
 *         id_tarea:
 *           type: integer
 *         clave:
 *           type: string
 *         resumen:
 *           type: string
 *         descripcion:
 *           type: string
 *         id_tipo_tarea:
 *           type: integer
 *           nullable: true
 *         id_prioridad:
 *           type: integer
 *           nullable: true
 *         id_estado:
 *           type: integer
 *           nullable: true
 *         id_asignado:
 *           type: integer
 *           nullable: true
 *         id_columna:
 *           type: integer
 *           nullable: true
 *     CrearTarea:
 *       type: object
 *       required:
 *         - resumen
 *         - descripcion
 *       properties:
 *         clave:
 *           type: string
 *         resumen:
 *           type: string
 *         descripcion:
 *           type: string
 *         id_tipo_tarea:
 *           type: integer
 *         id_prioridad:
 *           type: integer
 *         id_estado:
 *           type: integer
 *         id_asignado:
 *           type: integer
 *         id_columna:
 *           type: integer
 *     ActualizarTarea:
 *       type: object
 *       properties:
 *         clave:
 *           type: string
 *         resumen:
 *           type: string
 *         descripcion:
 *           type: string
 *         id_tipo_tarea:
 *           type: integer
 *         id_prioridad:
 *           type: integer
 *         id_estado:
 *           type: integer
 *         id_asignado:
 *           type: integer
 *         id_columna:
 *           type: integer
 */

/**
 * @openapi
 * /tareas:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearTarea'
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *
 * /tareas/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarTarea'
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *   delete:
 *     summary: Eliminar una tarea (soft delete)
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 */

router.get("/", catchErrors(ctrl.obtenerTodas.bind(ctrl)));
router.post("/", validarDatos(crearTareaSchema), catchErrors(ctrl.crear.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarTareaSchema), catchErrors(ctrl.actualizar.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminar.bind(ctrl)));

export default router;

import { Router } from "express";
import { ActividadController } from "../controllers/actividad.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearActividadSchema, actualizarActividadSchema } from "../dtos/actividad.dto";

const router = Router();
const ctrl = new ActividadController();

/**
 * @openapi
 * tags:
 *   - name: Actividades
 *     description: CRUD de actividades
 *
 * components:
 *   schemas:
 *     Actividad:
 *       type: object
 *       properties:
 *         id_actividad:
 *           type: integer
 *         id_tarea:
 *           type: integer
 *           nullable: true
 *         id_usuario:
 *           type: integer
 *           nullable: true
 *         descripcion:
 *           type: string
 *         fecha:
 *           type: string
 *           format: date-time
 *     CrearActividad:
 *       type: object
 *       required:
 *         - descripcion
 *       properties:
 *         id_tarea:
 *           type: integer
 *         id_usuario:
 *           type: integer
 *         descripcion:
 *           type: string
 *     ActualizarActividad:
 *       type: object
 *       properties:
 *         id_tarea:
 *           type: integer
 *         id_usuario:
 *           type: integer
 *         descripcion:
 *           type: string
 */

/**
 * @openapi
 * /actividades:
 *   get:
 *     summary: Obtener todas las actividades
 *     tags: [Actividades]
 *     responses:
 *       200:
 *         description: Lista de actividades
 *   post:
 *     summary: Crear una nueva actividad
 *     tags: [Actividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearActividad'
 *     responses:
 *       201:
 *         description: Actividad creada correctamente
 *
 * /actividades/{id}:
 *   get:
 *     summary: Obtener actividad por ID
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Actividad encontrada
 *       404:
 *         description: No encontrada
 *   put:
 *     summary: Actualizar una actividad
 *     tags: [Actividades]
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
 *             $ref: '#/components/schemas/ActualizarActividad'
 *     responses:
 *       200:
 *         description: Actividad actualizada
 *   delete:
 *     summary: Eliminar una actividad (soft delete)
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Actividad eliminada
 */

router.post("/", validarDatos(crearActividadSchema), catchErrors(ctrl.crearActividad.bind(ctrl)));
router.get("/", catchErrors(ctrl.obtenerActividades.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerActividadPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarActividadSchema), catchErrors(ctrl.actualizarActividad.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarActividad.bind(ctrl)));

export default router;

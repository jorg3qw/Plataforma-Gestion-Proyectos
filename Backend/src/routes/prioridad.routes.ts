import { Router } from "express";
import { PrioridadController } from "../controllers/prioridad.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearPrioridadSchema, actualizarPrioridadSchema } from "../dtos/prioridad.dto";

const router = Router();
const ctrl = new PrioridadController();

/**
 * @openapi
 * tags:
 *   - name: Prioridades
 *     description: CRUD de prioridades
 *
 * components:
 *   schemas:
 *     Prioridad:
 *       type: object
 *       properties:
 *         id_prioridad:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     CrearPrioridad:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     ActualizarPrioridad:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 */

/**
 * @openapi
 * /prioridades:
 *   get:
 *     summary: Obtener todas las prioridades
 *     tags: [Prioridades]
 *     responses:
 *       200:
 *         description: Lista de prioridades
 *   post:
 *     summary: Crear una nueva prioridad
 *     tags: [Prioridades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearPrioridad'
 *     responses:
 *       201:
 *         description: Prioridad creada correctamente
 *
 * /prioridades/{id}:
 *   get:
 *     summary: Obtener una prioridad por ID
 *     tags: [Prioridades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Prioridad encontrada
 *       404:
 *         description: Prioridad no encontrada
 *   put:
 *     summary: Actualizar una prioridad
 *     tags: [Prioridades]
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
 *             $ref: '#/components/schemas/ActualizarPrioridad'
 *     responses:
 *       200:
 *         description: Prioridad actualizada correctamente
 *   delete:
 *     summary: Eliminar una prioridad (soft delete)
 *     tags: [Prioridades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Prioridad eliminada correctamente
 */

router.get("/", catchErrors(ctrl.obtenerPrioridades.bind(ctrl)));
router.post("/", validarDatos(crearPrioridadSchema), catchErrors(ctrl.crearPrioridad.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerPrioridadPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarPrioridadSchema), catchErrors(ctrl.actualizarPrioridad.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarPrioridad.bind(ctrl)));

export default router;

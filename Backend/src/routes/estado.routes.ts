import { Router } from "express";
import { EstadoController } from "../controllers/estado.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearEstadoSchema, actualizarEstadoSchema } from "../dtos/estado.dto";

const router = Router();
const ctrl = new EstadoController();

/**
 * @openapi
 * tags:
 *   - name: Estados
 *     description: CRUD de estados de proyectos/tareas
 *
 * components:
 *   schemas:
 *     Estado:
 *       type: object
 *       properties:
 *         id_estado:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     CrearEstado:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     ActualizarEstado:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 */

/**
 * @openapi
 * /estados:
 *   get:
 *     summary: Obtener todos los estados
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: Lista de estados
 *   post:
 *     summary: Crear un nuevo estado
 *     tags: [Estados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearEstado'
 *     responses:
 *       201:
 *         description: Estado creado correctamente
 *
 * /estados/{id}:
 *   get:
 *     summary: Obtener un estado por ID
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado encontrado
 *       404:
 *         description: Estado no encontrado
 *   put:
 *     summary: Actualizar un estado
 *     tags: [Estados]
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
 *             $ref: '#/components/schemas/ActualizarEstado'
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *   delete:
 *     summary: Eliminar un estado (soft delete)
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado eliminado correctamente
 */

router.get("/", catchErrors(ctrl.obtenerEstados.bind(ctrl)));
router.post("/", validarDatos(crearEstadoSchema), catchErrors(ctrl.crearEstado.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerEstadoPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarEstadoSchema), catchErrors(ctrl.actualizarEstado.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarEstado.bind(ctrl)));

export default router;

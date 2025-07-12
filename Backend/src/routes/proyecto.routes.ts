import { Router } from "express";
import { ProyectoController } from "../controllers/proyecto.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearProyectoSchema, actualizarProyectoSchema } from "../dtos/proyecto.dto";

const router = Router();
const ctrl = new ProyectoController();

/**
 * @openapi
 * tags:
 *   - name: Proyectos
 *     description: CRUD de proyectos
 *
 * components:
 *   schemas:
 *     Proyecto:
 *       type: object
 *       properties:
 *         id_proyecto:
 *           type: integer
 *         codigo:
 *           type: string
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         fecha_inicio:
 *           type: string
 *           format: date
 *         fecha_fin:
 *           type: string
 *           format: date
 *         id_propietario:
 *           type: integer
 *         id_estado:
 *           type: integer
 *     CrearProyecto:
 *       type: object
 *       required:
 *         - codigo
 *         - nombre
 *         - fecha_inicio
 *       properties:
 *         codigo:
 *           type: string
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         fecha_inicio:
 *           type: string
 *           format: date
 *         fecha_fin:
 *           type: string
 *           format: date
 *         id_propietario:
 *           type: integer
 *         id_estado:
 *           type: integer
 *     ActualizarProyecto:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         fecha_inicio:
 *           type: string
 *         fecha_fin:
 *           type: string
 *         id_propietario:
 *           type: integer
 *         id_estado:
 *           type: integer
 */

/**
 * @openapi
 * /proyectos:
 *   get:
 *     summary: Obtener todos los proyectos
 *     tags: [Proyectos]
 *     responses:
 *       200:
 *         description: Lista de proyectos
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearProyecto'
 *     responses:
 *       201:
 *         description: Proyecto creado correctamente
 *
 * /proyectos/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *       404:
 *         description: Proyecto no encontrado
 *   put:
 *     summary: Actualizar un proyecto
 *     tags: [Proyectos]
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
 *             $ref: '#/components/schemas/ActualizarProyecto'
 *     responses:
 *       200:
 *         description: Proyecto actualizado correctamente
 *   delete:
 *     summary: Eliminar un proyecto (soft delete)
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Proyecto eliminado correctamente
 */

router.get("/", catchErrors(ctrl.obtenerProyectos.bind(ctrl)));
router.post("/", validarDatos(crearProyectoSchema), catchErrors(ctrl.crearProyecto.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerProyectoPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarProyectoSchema), catchErrors(ctrl.actualizarProyecto.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarProyecto.bind(ctrl)));

export default router;

import { Router } from "express";
import { TableroController } from "../controllers/tablero.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearTableroSchema, actualizarTableroSchema } from "../dtos/tablero.dto";

const router = Router();
const ctrl = new TableroController();

/**
 * @openapi
 * tags:
 *   - name: Tableros
 *     description: CRUD de tableros de proyecto
 *
 * components:
 *   schemas:
 *     Tablero:
 *       type: object
 *       properties:
 *         id_tablero:
 *           type: integer
 *         id_proyecto:
 *           type: integer
 *           nullable: true
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     CrearTablero:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id_proyecto:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *     ActualizarTablero:
 *       type: object
 *       properties:
 *         id_proyecto:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 */

/**
 * @openapi
 * /tableros:
 *   get:
 *     summary: Obtener todos los tableros
 *     tags: [Tableros]
 *     responses:
 *       200:
 *         description: Lista de tableros
 *   post:
 *     summary: Crear un nuevo tablero
 *     tags: [Tableros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearTablero'
 *     responses:
 *       201:
 *         description: Tablero creado correctamente
 *
 * /tableros/{id}:
 *   get:
 *     summary: Obtener un tablero por ID
 *     tags: [Tableros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tablero encontrado
 *       404:
 *         description: Tablero no encontrado
 *   put:
 *     summary: Actualizar un tablero
 *     tags: [Tableros]
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
 *             $ref: '#/components/schemas/ActualizarTablero'
 *     responses:
 *       200:
 *         description: Tablero actualizado correctamente
 *   delete:
 *     summary: Eliminar un tablero (soft delete)
 *     tags: [Tableros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tablero eliminado correctamente
 */

router.get("/", catchErrors(ctrl.obtenerTodos.bind(ctrl)));
router.post("/", validarDatos(crearTableroSchema), catchErrors(ctrl.crear.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarTableroSchema), catchErrors(ctrl.actualizar.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminar.bind(ctrl)));

export default router;

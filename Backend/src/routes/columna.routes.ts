import { Router } from "express";
import { ColumnaController } from "../controllers/columna.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearColumnaSchema, actualizarColumnaSchema } from "../dtos/columna.dto";

const router = Router();
const ctrl = new ColumnaController();

/**
 * @openapi
 * tags:
 *   - name: Columnas
 *     description: CRUD de columnas
 *
 * components:
 *   schemas:
 *     Columna:
 *       type: object
 *       properties:
 *         id_columna:
 *           type: integer
 *         id_tablero:
 *           type: integer
 *           nullable: true
 *         nombre:
 *           type: string
 *         posicion:
 *           type: integer
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *     CrearColumna:
 *       type: object
 *       required:
 *         - nombre
 *         - posicion
 *       properties:
 *         id_tablero:
 *           type: integer
 *         nombre:
 *           type: string
 *         posicion:
 *           type: integer
 *     ActualizarColumna:
 *       type: object
 *       properties:
 *         id_tablero:
 *           type: integer
 *         nombre:
 *           type: string
 *         posicion:
 *           type: integer
 */

/**
 * @openapi
 * /columnas:
 *   get:
 *     summary: Obtener todas las columnas
 *     tags: [Columnas]
 *     responses:
 *       200:
 *         description: Lista de columnas
 *   post:
 *     summary: Crear una nueva columna
 *     tags: [Columnas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearColumna'
 *     responses:
 *       201:
 *         description: Columna creada correctamente
 *
 * /columnas/{id}:
 *   get:
 *     summary: Obtener columna por ID
 *     tags: [Columnas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Columna encontrada
 *       404:
 *         description: No encontrada
 *   put:
 *     summary: Actualizar una columna
 *     tags: [Columnas]
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
 *             $ref: '#/components/schemas/ActualizarColumna'
 *     responses:
 *       200:
 *         description: Columna actualizada
 *   delete:
 *     summary: Eliminar una columna (soft delete)
 *     tags: [Columnas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Columna eliminada
 */

router.post("/", validarDatos(crearColumnaSchema), catchErrors(ctrl.crearColumna.bind(ctrl)));
router.get("/", catchErrors(ctrl.obtenerColumnas.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerColumnaPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarColumnaSchema), catchErrors(ctrl.actualizarColumna.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarColumna.bind(ctrl)));

export default router;

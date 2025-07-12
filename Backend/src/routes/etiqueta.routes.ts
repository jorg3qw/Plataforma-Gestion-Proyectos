import { Router } from "express";
import { EtiquetaController } from "../controllers/etiqueta.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearEtiquetaSchema, actualizarEtiquetaSchema } from "../dtos/etiqueta.dto";

const router = Router();
const ctrl = new EtiquetaController();

/**
 * @openapi
 * tags:
 *   - name: Etiquetas
 *     description: CRUD de etiquetas
 *
 * components:
 *   schemas:
 *     Etiqueta:
 *       type: object
 *       properties:
 *         id_etiqueta:
 *           type: integer
 *         nombre:
 *           type: string
 *         color:
 *           type: string
 *     CrearEtiqueta:
 *       type: object
 *       required:
 *         - nombre
 *         - color
 *       properties:
 *         nombre:
 *           type: string
 *         color:
 *           type: string
 *     ActualizarEtiqueta:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         color:
 *           type: string
 */

/**
 * @openapi
 * /etiquetas:
 *   get:
 *     summary: Obtener todas las etiquetas
 *     tags: [Etiquetas]
 *     responses:
 *       200:
 *         description: Lista de etiquetas
 *   post:
 *     summary: Crear una nueva etiqueta
 *     tags: [Etiquetas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearEtiqueta'
 *     responses:
 *       201:
 *         description: Etiqueta creada correctamente
 *
 * /etiquetas/{id}:
 *   get:
 *     summary: Obtener una etiqueta por ID
 *     tags: [Etiquetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Etiqueta encontrada
 *       404:
 *         description: Etiqueta no encontrada
 *   put:
 *     summary: Actualizar una etiqueta
 *     tags: [Etiquetas]
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
 *             $ref: '#/components/schemas/ActualizarEtiqueta'
 *     responses:
 *       200:
 *         description: Etiqueta actualizada correctamente
 *   delete:
 *     summary: Eliminar una etiqueta (soft delete)
 *     tags: [Etiquetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Etiqueta eliminada correctamente
 */

router.get("/", catchErrors(ctrl.obtenerEtiquetas.bind(ctrl)));
router.post("/", validarDatos(crearEtiquetaSchema), catchErrors(ctrl.crearEtiqueta.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerEtiquetaPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarEtiquetaSchema), catchErrors(ctrl.actualizarEtiqueta.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarEtiqueta.bind(ctrl)));

export default router;

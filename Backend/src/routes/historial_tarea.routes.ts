import { Router } from "express";
import { HistorialTareaController } from "../controllers/historial_tarea.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearHistorialTareaSchema, actualizarHistorialTareaSchema } from "../dtos/historial_tarea.dto";

const router = Router();
const ctrl = new HistorialTareaController();

router.post("/", validarDatos(crearHistorialTareaSchema), catchErrors(ctrl.crear.bind(ctrl)));
router.get("/", catchErrors(ctrl.obtenerTodos.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarHistorialTareaSchema), catchErrors(ctrl.actualizar.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminar.bind(ctrl)));

export default router;

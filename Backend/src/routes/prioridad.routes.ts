import { Router } from "express";
import { PrioridadController } from "../controllers/prioridad.controller";
import { validarDatos } from "../middlewares/validarDatos";
import { crearPrioridadSchema, actualizarPrioridadSchema } from "../dtos/prioridad.dto";
import catchErrors from "../utils/catchErrors";

const router = Router();
const controller = new PrioridadController();

router.post("/", validarDatos(crearPrioridadSchema), catchErrors(controller.crearPrioridad));
router.get("/", catchErrors(controller.obtenerTodas));
router.get("/:id", catchErrors(controller.obtenerPorId));
router.put("/:id", validarDatos(actualizarPrioridadSchema), catchErrors(controller.actualizarPrioridad));
router.delete("/:id", catchErrors(controller.eliminarPrioridad));

export default router;
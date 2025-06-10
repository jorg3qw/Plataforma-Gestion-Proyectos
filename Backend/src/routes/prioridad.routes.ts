import { Router } from "express";
import { PrioridadController } from "../controllers/prioridad.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import {
  crearPrioridadSchema,
  actualizarPrioridadSchema,
} from "../dtos/prioridad.dto";

const router = Router();
const ctrl = new PrioridadController();

router.post("/",validarDatos(crearPrioridadSchema),catchErrors(ctrl.crearPrioridad.bind(ctrl)));
router.get("/",catchErrors(ctrl.obtenerPrioridades.bind(ctrl)));
router.get("/:id",catchErrors(ctrl.obtenerPrioridadPorId.bind(ctrl)));
router.put("/:id",validarDatos(actualizarPrioridadSchema),catchErrors(ctrl.actualizarPrioridad.bind(ctrl)));
router.delete("/:id",catchErrors(ctrl.eliminarPrioridad.bind(ctrl)));

export default router;

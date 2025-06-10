import { Router } from "express";
import { TipoTareaController } from "../controllers/tipo_tarea.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import {crearTipoTareaSchema,actualizarTipoTareaSchema} from "../dtos/tipo_tarea.dto";

const router = Router();
const ctrl = new TipoTareaController();

router.post("/",validarDatos(crearTipoTareaSchema),catchErrors(ctrl.crearTipoTarea.bind(ctrl)));
router.get("/",catchErrors(ctrl.obtenerTiposTarea.bind(ctrl)));
router.get("/:id",catchErrors(ctrl.obtenerTipoTareaPorId.bind(ctrl)));
router.put("/:id",validarDatos(actualizarTipoTareaSchema),catchErrors(ctrl.actualizarTipoTarea.bind(ctrl)));
router.delete("/:id",catchErrors(ctrl.eliminarTipoTarea.bind(ctrl)));

export default router;

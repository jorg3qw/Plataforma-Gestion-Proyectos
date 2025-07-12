import { Router } from "express";
import { TareaEtiquetaController } from "../controllers/tarea_etiqueta.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearTareaEtiquetaSchema } from "../dtos/tarea_etiqueta.dto";

const router = Router();
const ctrl = new TareaEtiquetaController();

router.post("/", validarDatos(crearTareaEtiquetaSchema), catchErrors(ctrl.crear.bind(ctrl)));
router.get("/", catchErrors(ctrl.obtenerTodos.bind(ctrl)));
router.delete("/:id_tarea/:id_etiqueta", catchErrors(ctrl.eliminar.bind(ctrl)));

export default router;

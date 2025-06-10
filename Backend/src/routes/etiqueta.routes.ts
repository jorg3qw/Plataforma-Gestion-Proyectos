import { Router } from "express";
import { EtiquetaController } from "../controllers/etiqueta.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import {
    crearEtiquetaSchema,
    actualizarEtiquetaSchema,
} from "../dtos/etiqueta.dto";

const router = Router();
const ctrl = new EtiquetaController();

router.post("/",validarDatos(crearEtiquetaSchema),catchErrors(ctrl.crearEtiqueta.bind(ctrl)));
router.get("/",catchErrors(ctrl.obtenerEtiquetas.bind(ctrl)));
router.get("/:id",catchErrors(ctrl.obtenerEtiquetaPorId.bind(ctrl)));
router.put("/:id",validarDatos(actualizarEtiquetaSchema),catchErrors(ctrl.actualizarEtiqueta.bind(ctrl)));
router.delete("/:id",catchErrors(ctrl.eliminarEtiqueta.bind(ctrl)));

export default router;

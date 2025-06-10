import { Router } from "express";
import { EstadoController } from "../controllers/estado.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearEstadoSchema, actualizarEstadoSchema } from "../dtos/estado.dto";

const router = Router();
const ctrl = new EstadoController();

router.post("/",validarDatos(crearEstadoSchema),catchErrors(ctrl.crearEstado.bind(ctrl)));
router.get("/",catchErrors(ctrl.obtenerEstados.bind(ctrl)));
router.get("/:id",catchErrors(ctrl.obtenerEstadoPorId.bind(ctrl)));
router.put("/:id",validarDatos(actualizarEstadoSchema),catchErrors(ctrl.actualizarEstado.bind(ctrl)));
router.delete("/:id",catchErrors(ctrl.eliminarEstado.bind(ctrl)));

export default router;

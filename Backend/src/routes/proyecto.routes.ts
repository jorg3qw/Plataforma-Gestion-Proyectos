import { Router } from "express";
import { ProyectoController } from "../controllers/proyecto.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import {crearProyectoSchema,actualizarProyectoSchema} from "../dtos/proyecto.dto";

const router = Router();
const ctrl = new ProyectoController();

router.post("/",validarDatos(crearProyectoSchema),catchErrors(ctrl.crearProyecto.bind(ctrl)));
router.get("/", catchErrors(ctrl.obtenerProyectos.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerProyectoPorId.bind(ctrl)));
router.put("/:id", validarDatos(actualizarProyectoSchema),catchErrors(ctrl.actualizarProyecto.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarProyecto.bind(ctrl)));

export default router;

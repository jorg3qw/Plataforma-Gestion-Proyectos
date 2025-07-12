import { Router } from "express";
import { MiembroProyectoController } from "../controllers/miembro_proyecto.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import { crearMiembroProyectoSchema } from "../dtos/miembro_proyecto.dto";

const router = Router();
const ctrl = new MiembroProyectoController();

router.post("/", validarDatos(crearMiembroProyectoSchema), catchErrors(ctrl.crear.bind(ctrl)));
router.get("/", catchErrors(ctrl.obtenerTodos.bind(ctrl)));
router.get("/:id_proyecto/:id_usuario", catchErrors(ctrl.obtenerPorId.bind(ctrl)));
router.delete("/:id_proyecto/:id_usuario", catchErrors(ctrl.eliminar.bind(ctrl)));

export default router;

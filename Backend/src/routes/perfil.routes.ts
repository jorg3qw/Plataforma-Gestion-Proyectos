import { Router } from "express";
import { PerfilController } from "../controllers/perfil.controller";
import { validarDatos } from "../middlewares/validarDatos";
import { crearPerfilSchema, actualizarPerfilSchema } from "../dtos/perfil.dto";
import catchErrors from "../utils/catchErrors";

const router = Router();
const controller = new PerfilController();

router.post("/", validarDatos(crearPerfilSchema), catchErrors(controller.crearPerfil));
router.get("/", catchErrors(controller.obtenerPerfiles));
router.get("/:id", catchErrors(controller.obtenerPerfilPorId));
router.put("/:id", validarDatos(actualizarPerfilSchema), catchErrors(controller.actualizarPerfil));
router.delete("/:id", catchErrors(controller.eliminarPerfil));

export default router;

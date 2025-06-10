import { Router } from "express";
import { PerfilController } from "../controllers/perfil.controller";
import { validarDatos } from "../middlewares/validarDatos";
import { crearPerfilSchema, actualizarPerfilSchema } from "../dtos/perfil.dto";
import catchErrors from "../utils/catchErrors";

const router = Router();
const ctrl = new PerfilController();

router.post("/",validarDatos(crearPerfilSchema),catchErrors(ctrl.crearPerfil.bind(ctrl)));
router.get("/",catchErrors(ctrl.obtenerPerfiles.bind(ctrl)));
router.get("/:id",catchErrors(ctrl.obtenerPerfilPorId.bind(ctrl)));
router.put("/:id",validarDatos(actualizarPerfilSchema),catchErrors(ctrl.actualizarPerfil.bind(ctrl)));
router.delete("/:id",catchErrors(ctrl.eliminarPerfil.bind(ctrl)));

export default router;

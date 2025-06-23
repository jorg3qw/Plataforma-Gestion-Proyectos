import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { validarDatos } from "../middlewares/validarDatos";
import catchErrors from "../utils/catchErrors";
import {crearUsuarioSchema,actualizarUsuarioSchema} from "../dtos/usuario.dto";

const router = Router();
const ctrl = new UsuarioController();

router.post("/",validarDatos(crearUsuarioSchema),catchErrors(ctrl.crearUsuario.bind(ctrl)));
router.get("/", catchErrors(ctrl.obtenerUsuarios.bind(ctrl)));
router.get("/:id", catchErrors(ctrl.obtenerUsuarioPorId.bind(ctrl)));
router.put("/:id",validarDatos(actualizarUsuarioSchema),catchErrors(ctrl.actualizarUsuario.bind(ctrl)));
router.delete("/:id", catchErrors(ctrl.eliminarUsuario.bind(ctrl)));

export default router;

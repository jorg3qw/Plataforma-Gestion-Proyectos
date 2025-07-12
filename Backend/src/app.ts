import express from "express";
import cors from "cors";
import perfilRoutes from "./routes/perfil.routes";
import prioridadRoutes from "./routes/prioridad.routes";
import etiquetasRoutes from "./routes/etiqueta.routes";
import tipoTareaRoutes from "./routes/tipo_tarea.routes";
import estadoRoutes from "./routes/estado.routes";
import usuarioRoutes from "./routes/usuario.routes";
import proyectoRouter from "./routes/proyecto.routes";
import columnaRoutes from "./routes/columna.routes";
import actividadRoutes from "./routes/actividad.routes";
import comentarioRoutes from "./routes/comentario.routes";
import historialTareaRoutes from "./routes/historial_tarea.routes";
import miembroProyectoRoutes from "./routes/miembro_proyecto.routes";
import tableroRoutes from "./routes/tablero.routes";
import tareaEtiquetaRoutes from "./routes/tarea_etiqueta.routes";
import tareaRoutes from "./routes/tarea.routes";
import { APP_ORIGIN } from "./constants/env";
import errorHandler from "./middlewares/errorHandler";
import { setupSwagger } from "./swagger";

const app = express();

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
)
app.disable("x-powered-by");
setupSwagger(app);

// Routes
app.use("/api/perfiles", perfilRoutes);
app.use("/api/prioridades", prioridadRoutes);
app.use("/api/etiquetas", etiquetasRoutes);
app.use("/api/tipos-tarea", tipoTareaRoutes);
app.use("/api/estados", estadoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRouter);
app.use("/api/columnas", columnaRoutes);
app.use("/api/actividades", actividadRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/historial-tareas", historialTareaRoutes);
app.use("/api/miembros-proyecto", miembroProyectoRoutes);
app.use("/api/tableros", tableroRoutes);
app.use("/api/tarea-etiqueta", tareaEtiquetaRoutes);
app.use("/api/tareas", tareaRoutes);
app.use(errorHandler);

export default app;

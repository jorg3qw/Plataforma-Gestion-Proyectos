import express from "express";
import cors from "cors";
import perfilRoutes from "./routes/perfil.routes";
import prioridadRoutes from "./routes/prioridad.routes";
import etiquetasRoutes from "./routes/etiqueta.routes";
import tipoTareaRoutes from "./routes/tipo_tarea.routes";
import estadoRoutes from "./routes/estado.routes";
import { APP_ORIGIN } from "./constants/env";
import errorHandler from "./middlewares/errorHandler";

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

// Routes
app.use("/api/perfiles", perfilRoutes);
app.use("/api/prioridades", prioridadRoutes);
app.use("/api/etiquetas", etiquetasRoutes);
app.use("/api/tipos-tarea", tipoTareaRoutes);
app.use("/api/estados", estadoRoutes);
app.use(errorHandler);

export default app;

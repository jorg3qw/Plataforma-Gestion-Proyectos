import app from "./app";
import { PORT } from "./constants/env";

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

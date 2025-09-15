import express from "express";
import cors from "cors";
import ejemploRoutes from "./routes/ejemplo.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/ejemplo", ejemploRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

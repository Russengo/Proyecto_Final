import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import sequelize from "./config/database.js";
import usuarioRoutes from "./routes/routes.js";
import Usuario from "./models/Usuario.js"; // importamos el modelo

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);

// Función para crear usuario master si no existe
async function crearMaster() {
  try {
    const existe = await Usuario.findOne({ where: { rol: "master" } });
    if (!existe) {
      const hashedPassword = await bcrypt.hash("TuPasswordMaster123", 10);
      await Usuario.create({
        nombre: "Master",
        apellido: "Admin",
        password: hashedPassword,
        telefono: "123456789",
        direccion: "Casa Admin",
        rol: "master",
      });
      console.log("✅ Usuario master creado");
    } else {
      console.log("Usuario master ya existe");
    }
  } catch (err) {
    console.error("Error creando usuario master:", err);
  }
}

// Sincronizamos DB y levantamos servidor
sequelize.sync({ alter: true })
  .then(async () => {
    console.log("✅ DB sincronizada");
    await crearMaster(); // <-- creamos master si hace falta
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error("Error al conectar DB:", err));

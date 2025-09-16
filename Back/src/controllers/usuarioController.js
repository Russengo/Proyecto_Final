import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Registrar usuario
export const registrar = async (req, res) => {
  try {
    const { nombre, apellido, password, telefono, direccion, rol } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // hash de contraseña

    const usuario = await Usuario.create({
      nombre,
      apellido,
      password: hashedPassword,
      telefono,
      direccion,
      rol,
    });

    res.json({ mensaje: "Usuario registrado", usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    const usuario = await Usuario.findOne({ where: { nombre } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      config.jwt.secret,
      { expiresIn: config.jwt.expires }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      rol: usuario.rol,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar usuarios (ruta protegida)
export const listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const borrado = await usuario.destroy();

    if (!borrado) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

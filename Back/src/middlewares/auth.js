import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function verificarToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(403).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.usuario = decoded; // info del usuario disponible en req
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

// Middleware opcional: solo master
export function soloMaster(req, res, next) {
  if (req.usuario?.rol !== "master") {
    return res.status(403).json({ error: "Acceso solo para master" });
  }
  next();
}

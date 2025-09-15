// Back/src/models/ejemplo.model.js
import pool from "../database.js";

// Obtener todos los registros de ejemplo
export const getEjemplos = async () => {
  const [rows] = await pool.query("SELECT * FROM ejemplo");
  return rows;
};

// Crear un nuevo registro de ejemplo
export const crearEjemplo = async (nombre, descripcion) => {
  const [result] = await pool.query(
    "INSERT INTO ejemplo (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion]
  );
  return result.insertId;
};

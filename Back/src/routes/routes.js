import express from "express";
import { registrar, login, listar, eliminarUsuario } from "../controllers/usuarioController.js";
import { verificarToken, soloMaster } from "../middlewares/auth.js";
import { getInsumos, createInsumo, updateInsumo, deleteInsumo } from "../controllers/InsumoController.js";

const router = express.Router();

// Rutas de usuarios
router.post("/register", registrar);        // registra usuario
router.post("/login", login);              // login
router.get("/", verificarToken, listar);    // listar usuarios (protegida)
router.delete("/:id", verificarToken, soloMaster, eliminarUsuario); // eliminar solo master

// CRUD de Insumos
router.get("/insumos", verificarToken, getInsumos);
router.post("/insumos", verificarToken, createInsumo);
router.put("/insumos/:id", verificarToken, updateInsumo);
router.delete("/insumos/:id", verificarToken, deleteInsumo);

export default router;

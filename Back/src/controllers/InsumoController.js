// src/controllers/InsumoController.js
import Insumo from "../models/Insumo.js";

export const getInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.findAll();
    res.json(insumos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los insumos" });
  }
};

export const createInsumo = async (req, res) => {
  try {
    const { nombre, descripcion, cantidad } = req.body;
    const insumo = await Insumo.create({ nombre, descripcion, cantidad });
    res.json(insumo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el insumo" });
  }
};

export const updateInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, cantidad } = req.body;
    const insumo = await Insumo.findByPk(id);

    if (!insumo) {
      return res.status(404).json({ error: "Insumo no encontrado" });
    }

    await insumo.update({ nombre, descripcion, cantidad });
    res.json(insumo);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el insumo" });
  }
};

export const deleteInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const insumo = await Insumo.findByPk(id);

    if (!insumo) {
      return res.status(404).json({ error: "Insumo no encontrado" });
    }

    await insumo.destroy();
    res.json({ message: "Insumo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el insumo" });
  }
};

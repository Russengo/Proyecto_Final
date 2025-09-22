// src/models/Insumo.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Insumo = sequelize.define("Insumo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: "insumos",
  timestamps: true
});

export default Insumo;

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Header extends Model {
  public id!: number;
  public nombre!: string;
  public ruta!: string;
  public icono!: string;
  public orden!: number;
  public activo!: boolean;
}

Header.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ruta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "header",
    timestamps: true,
  }
);
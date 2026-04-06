import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize";

export class Supplier extends Model {
  public id!: number;
  public nombre!: string;
  public telefono!: string;
  public correo!: string;
  public direccion!: string;
}

Supplier.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    telefono: { 
        type: DataTypes.STRING 
    },
    correo: { 
        type: DataTypes.STRING 
    },
    direccion: { 
        type: DataTypes.STRING 
    },
  },
  {
    sequelize,
    tableName: "suppliers",
  }
);
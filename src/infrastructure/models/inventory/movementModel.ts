import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize";

export class Movement extends Model {
  public id!: number;
  public materialId!: number;
  public tipo!: string;
  public cantidad!: number;
  public motivo!: string;
  public fecha!: Date;
}

Movement.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    materialId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    tipo: { 
        type: DataTypes.ENUM("IN", "OUT"), 
        allowNull: false 
    },
    cantidad: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    motivo: { 
        type: DataTypes.STRING 
    },
    fecha: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
  },
  {
    sequelize,
    tableName: "movements",
  }
);
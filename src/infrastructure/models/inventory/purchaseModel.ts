import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize";

export class Purchase extends Model {
  public id!: number;
  public supplierId!: number;
  public total!: number;
}

Purchase.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    supplierId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    total: { 
        type: DataTypes.FLOAT, 
        defaultValue: 0 
    },
  },
  {
    sequelize,
    tableName: "Materialpurchases",
  }
);
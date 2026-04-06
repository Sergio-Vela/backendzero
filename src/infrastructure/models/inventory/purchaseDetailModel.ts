import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize";

export class PurchaseDetail extends Model {
  public id!: number;
  public purchaseId!: number;
  public materialId!: number;
  public cantidad!: number;
  public precioUnitario!: number;
  public subtotal!: number;
}

PurchaseDetail.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    purchaseId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    materialId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    cantidad: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    precioUnitario: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    subtotal: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
  },
  {
    sequelize,
    tableName: "MaterialpurchaseDetail",
  }
);
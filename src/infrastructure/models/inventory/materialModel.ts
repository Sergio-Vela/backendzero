import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize";

export class Material extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public categoriaId!: number;
  public stockActual!: number;
  public stockMinimo!: number;
  public unidadMedida!: string;
}

Material.init(
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
    descripcion: { 
        type: DataTypes.STRING 
    },
    categoriaId: {
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    stockActual: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    stockMinimo: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    unidadMedida: { 
        type: DataTypes.STRING 
    },
  },
  {
    sequelize,
    tableName: "materials",
  }
);
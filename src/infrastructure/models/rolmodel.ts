import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Role extends Model {
    public id!: number;
    public rol!: string;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
       sequelize,
       tableName: "roles", 
    }
);
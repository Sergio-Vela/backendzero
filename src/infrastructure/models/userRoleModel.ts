import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UserRole extends Model {
    public id!: number;
    public userId!: number;
    public rolId!: number;
}

UserRole.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rolId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
       sequelize,
       tableName: "userRoles", 
    }
);
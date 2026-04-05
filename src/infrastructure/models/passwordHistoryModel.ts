import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class PasswordHistory extends Model {
    public id!: number;
    public userId!: number;
    public pwHash!: string;
    public current!: boolean;
    public createdAt!: Date;
}
PasswordHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pwHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        current: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

    },
    {
       sequelize,
       tableName: "pwHistory", 
    }
);
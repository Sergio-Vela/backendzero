import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UserProfile extends Model {
    public id!: number;
    public userId!: number;
    public fotoUrl!: string | null;
    public telefono!: string | null;
    public biografia!: string;

}

UserProfile.init(
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
        fotoUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        biografia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
       sequelize,
       tableName: "userProfiles", 
    }
);
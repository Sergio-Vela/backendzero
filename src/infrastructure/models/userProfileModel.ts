import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UserProfile extends Model {
    public id!: number;
    public userId!: number;
    public userName!: string;
    public fotoBase64!: string | null;
    public telefono!: string | null;
    public correo!: string | null;
    public biografia!: string;
    public fechaNac!: Date | null;
    public genero!: string | null;

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
        fotoBase64: {
            type: DataTypes.TEXT('medium'),
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        biografia: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        fechaNac: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        genero: {
            type: DataTypes.CHAR(1),
            allowNull: true,
        }
    },
    {
       sequelize,
       tableName: "userProfiles", 
    }
);
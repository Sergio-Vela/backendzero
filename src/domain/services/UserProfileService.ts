import { UserProfile } from "../../infrastructure/models/userProfileModel";
import { UserProfileDTO } from "../../application/dtos/userProfileDto";
/* 
export interface UserProfileService {
    createUserProfile(userId: number, userName: string, fotoBase64: string, telefono: string, biografia: string, fechaNac: Date, genero: string): Promise<UserProfile>;
    getUserProfile(userId: number): Promise<{
        id: number; nombre: string; apellido: string; usuario: string; profile: {
            id: number, fotoBase64: string;
            telefono: string; correo: string; biografia: string; fechaNac: Date; genero: string
        }
    } | null>;
    UpdateUserProfile(userId: number, fotoBase64: string | null, telefono: string | null, biografia: string,): Promise<void>;
} */

export interface UserProfileService {

    createUserProfile(data: {
        userId: number;
        fotoBase64?: string | null;
        telefono?: string | null;
        correo?: string | null;
        biografia: string | null;
        fechaNac?: Date | null;
        genero?: string | null;
    }): Promise<UserProfile>;

    getUserProfile(userId: number): Promise<UserProfileDTO | null>;

    updateUserProfile(
        userId: number,
        data: {
            fotoBase64?: string | null;
            telefono?: string | null;
            correo?: string | null;
            biografia?: string;
            fechaNac?: Date | null;
            genero?: string | null;
        }
    ): Promise<void>;
}
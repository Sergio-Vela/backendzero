import { UserProfileService } from "../../domain/services/UserProfileService";
import { User } from "../models/usermodel";
import { UserProfile } from "../models/userProfileModel";
import { UserProfileDTO } from "../../application/dtos/userProfileDto";

export class UserProfileServiceImpl implements UserProfileService {

    async createUserProfile(data: {
        userId: number;
        fotoBase64?: string | null;
        telefono?: string | null;
        correo?: string | null;
        biografia: string | null;
        fechaNac?: Date | null;
        genero?: string | null;
    }): Promise<UserProfile>{
        const createProfile: UserProfile = await UserProfile.create(data);
        return createProfile
    }

    async getUserProfile(userId: number): Promise<UserProfileDTO | null> {
        const user = await User.findByPk(userId, {
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['id', 'fotoBase64', 'telefono', 'correo', 'biografia', 'fechaNac', 'genero']
            }]
        });
        return user ? user.get() : null;
    }

    async updateUserProfile(userId: number, data: {
            fotoBase64?: string | null;
            telefono?: string | null;
            correo?: string | null;
            biografia?: string;
            fechaNac?: Date | null;
            genero?: string | null;
        }): Promise<void> {
        const userProfile = await UserProfile.findOne({ where: { userId } });
        if (!userProfile) {
            throw new Error("User profile not found")
        }
        if (data.fotoBase64 !== undefined) userProfile.fotoBase64 = data.fotoBase64;
        if (data.telefono !== undefined) userProfile.telefono = data.telefono;
        if (data.correo !== undefined) userProfile.correo = data.correo;
        if (data.biografia !== undefined) userProfile.biografia = data.biografia;
        if (data.fechaNac !== undefined) userProfile.fechaNac = data.fechaNac;
        if (data.genero !== undefined) userProfile.genero = data.genero;
        await userProfile.save();
    }

}
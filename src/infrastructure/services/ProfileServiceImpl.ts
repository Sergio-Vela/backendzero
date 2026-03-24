import { UserProfileService } from "../../domain/services/UserProfileService";
import { User } from "../models/usermodel";
import { UserProfile } from "../models/userProfileModel";

export class UserProfileServiceImpl implements UserProfileService {
    async createUserProfile(userId: number, fotoUrl: string, telefono: string, biografia: string): Promise<UserProfile>{
        const createProfile: UserProfile = await UserProfile.create({ userId: userId, fotoUrl, telefono, biografia });
        return createProfile
    }

    async getUserProfile(userId: number): Promise<{ id: number; nombre: string; apellido: string; usuario: string; profile: { id: number; fotoUrl: string; telefono: string; biografia: string; }; } | null> {
        const user = await User.findByPk(userId, {
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['id', 'fotoUrl', 'telefono', 'biografia']
            }]
        });
        return user ? user.get() : null;
    }

    async UpdateUserProfile(userId: number, fotoUrl: string | null, telefono: string | null, biografia: string) {
        const userProfile = await UserProfile.findByPk(userId);
        if (!userProfile) {
            throw new Error("User profile not found")
        }
        userProfile.fotoUrl = fotoUrl;
        userProfile.telefono = telefono;
        userProfile.biografia = biografia;
        await userProfile.save();
        return userProfile.get();
    }

}
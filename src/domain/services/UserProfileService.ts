import { UserProfile } from "../../infrastructure/models/userProfileModel";

export interface UserProfileService {
    createUserProfile(userId: number, fotoUrl: string, telefono: string, biografia: string): Promise<UserProfile>;
    getUserProfile(userId: number): Promise<{ id: number; nombre: string; apellido: string; usuario: string; profile: {id: number, fotoUrl: string;
                                                                                                                       telefono: string; biografia: string}} | null>;
    UpdateUserProfile(userId: number, fotoUrl: string | null, telefono: string | null, biografia: string,): Promise<void>;
}
import { Request, Response } from "express";
import { UserProfileServiceImpl } from "../../infrastructure/services/ProfileServiceImpl";


const profileService = new UserProfileServiceImpl

export class profileController {
    
    async getUserProfile(req: Request, res: Response){
        const { id } = req.params;
        try {
            const user = await profileService.getUserProfile(Number(id));
            if (!user) {
                res.status(404).json({ error: "User profile not found" });
            }else{
                res.status(200).json(user);
            } 
        } catch (error) {
            console.error("Error fetching user profile: ", error);
            res.status(500).json({ error: "Failed to fetch user profile" })
        }
    }

    async updateUserProfile(req: Request, res: Response){
        const { id } = req.params;
        const { fotoBase64, telefono, correo, biografia } = req.body;
        try {
            await profileService.updateUserProfile(Number(id), {fotoBase64: fotoBase64, telefono: telefono, correo: correo, biografia: biografia});
            res.status(200).json({ message: "User profile updated successfully" });
        } catch (error) {
            console.error("Error updating user profile: ", error);
            res.status(500).json({ error: "Failed to update user profile" });
        }
    }

}
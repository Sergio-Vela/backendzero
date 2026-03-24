import { Request, Response } from "express";
import { UserServiceImpl } from "../../infrastructure/services/UserServiceImpl";

const userService = new UserServiceImpl();

export class UserController {
    async createUser(req: Request, res: Response) {
        console.log('REQUESTTTTT', req);
        const { nombre, apellido, usuario, password } = req.body;
        try {
            const user = await userService.createUser(nombre, apellido, usuario);
            res.status(201).json(user);
        } catch (error) {
           console.error("Error creating user: ", error);
           res.status(500).json({ error: "Failed to create user :C" }); 
        }
    }

    async getUserById(req: Request, res: Response){
        const { id } = req.params;
        try {
            const user = await userService.getUserById(Number(id));
            if (!user) {
                res.status(404).json({ error: "User not found" });
            }else{
                res.status(200).json(user);
            } 
        } catch (error) {
            console.error("Error fetching user: ", error);
            res.status(500).json({ error: "Failed to fetch user" })
        }
    }

    async getUserByUsername(req : Request, res: Response){
        const { usuario } = req.params;
        try {
            const user = await userService.getUserByUsername(String(usuario));
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Failed to fetch user" });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, apellido, usuario, password } = req.body;
        try {
            const user = await userService.updateUser(Number(id), nombre, apellido, usuario);
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error("Error updating user: ", error);
            res.status(500).json({ error: "Failed to update user"});
        }        
    }

    async deleteUser(req: Request, res: Response){
        const { id } = req.params;
        try {
            const succes = await userService.deleteUser(Number(id));
            if (succes) {
                res.status(200).json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.error("Error deleting user: ", error);
            res.status(500).json({ error: "Failed to delete user" });
        }
    } 

}
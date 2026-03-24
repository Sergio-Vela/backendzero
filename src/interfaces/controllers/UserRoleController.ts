import { Request, Response } from "express";
import { UserRoleServiceImpl } from "../../infrastructure/services/UserRoleServiceImpl";

const userRoleService = new UserRoleServiceImpl();

export class UserRoleController {
    async createUserRole(req: Request, res: Response) {
        try {
            const { userId, roleId } = req.body;
            if (!Number.isInteger(Number(userId)) || Number(userId) <= 0 || !Number.isInteger(Number(roleId)) || Number(roleId) <= 0) {
                return res.status(400).json({ error: "Invalid userId or roleId" });
            }

            const created = await userRoleService.createUserRole(Number(userId), Number(roleId));
            return res.status(201).json(created);
        } catch (error) {
            console.error("Error creating user role:", error);
            return res.status(500).json({ error: "Failed to create user role" });
        }
    }

    async deleteUserRole(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const roleId = Number(req.params.roleId);

            if (!Number.isInteger(userId) || userId <= 0 || !Number.isInteger(roleId) || roleId <= 0) {
                return res.status(400).json({ error: "Invalid userId or roleId" });
            }

            await userRoleService.deleteUserRole(userId, roleId);
            return res.status(200).json({ message: "User role deleted successfully" });
        } catch (error) {
            console.error("Error deleting user role:", error);
            if ((error as Error).message === "User role not found") {
                return res.status(404).json({ error: "User role not found" });
            }
            return res.status(500).json({ error: "Failed to delete user role" });
        }
    }
}

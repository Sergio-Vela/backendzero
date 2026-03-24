import { Request, Response } from "express";
import { RoleImpl } from "../../infrastructure/services/RoleServiceImpl";

const roleService = new RoleImpl();

export class RoleController {
    async createRole(req: Request, res: Response) {
        try {
            const { rol } = req.body;
            if (!rol || typeof rol !== 'string' || !rol.trim()) {
                return res.status(400).json({ error: "Invalid rol parameter" });
            }

            const newRole = await roleService.createRole(rol.trim());
            return res.status(201).json(newRole);
        } catch (error) {
            console.error("Error creating role:", error);
            return res.status(500).json({ error: "Failed to create role" });
        }
    }

    async updateRole(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { rol } = req.body;

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ error: "Invalid role id" });
            }
            if (!rol || typeof rol !== 'string' || !rol.trim()) {
                return res.status(400).json({ error: "Invalid rol parameter" });
            }

            const updatedRole = await roleService.updateRole(id, rol.trim());
            if (!updatedRole) {
                return res.status(404).json({ error: "Role not found" });
            }

            return res.json(updatedRole);
        } catch (error) {
            console.error("Error updating role:", error);
            return res.status(500).json({ error: "Failed to update role" });
        }
    }

    async deleteRole(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ error: "Invalid role id" });
            }

            await roleService.deleteRole(id);
            return res.status(200).json({ message: "Role deleted successfully" });
        } catch (error) {
            console.error("Error deleting role:", error);
            if ((error as Error).message === "Role not found") {
                return res.status(404).json({ error: "Role not found" });
            }
            return res.status(500).json({ error: "Failed to delete role" });
        }
    }
}

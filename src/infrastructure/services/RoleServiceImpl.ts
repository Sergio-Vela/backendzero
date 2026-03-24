import { RoleService } from "../../domain/services/RoleService";
import { Role } from "../models/rolmodel";

export class RoleImpl implements RoleService {
    async createRole(rol: string): Promise<Role> {
        const newRole = await Role.create({ rol });
        return newRole;
    }

    /* async getAllRoles(): Promise<Role[]> {
        const roles = await Role.findAll();
        return roles;
    }

    async getRoleById(id: number): Promise<Role | null> {
        const role = await Role.findByPk(id);
        return role;
    }
    */
    async updateRole(id: number, rol: string): Promise<Role | null> {
        const role = await Role.findByPk(id);
        if (!role) {
            return null;
        }
        await role.update({ rol });
        return role;
    }

    async deleteRole(id: number): Promise<void> {
        const role = await Role.findByPk(id);
        if (!role) {
            throw new Error("Role not found");
        }
        await role.destroy();
    }

}
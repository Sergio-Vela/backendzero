import { UserRoleService } from "../../domain/services/UserRoleService";
import { UserRole } from "../models/userRoleModel";

export class UserRoleServiceImpl implements UserRoleService {
    async createUserRole(userId: number, roleId: number): Promise<UserRole> {
        const createRole: UserRole = await UserRole.create({ userId, rolId: roleId });
        return createRole;
    }

    async deleteUserRole(userId: number, roleId: number): Promise<void> {
        const userRole = await UserRole.findOne({ where: { userId, rolId: roleId } });
        if (!userRole) {
            throw new Error("User role not found");
        }
        await userRole.destroy();
    }
}
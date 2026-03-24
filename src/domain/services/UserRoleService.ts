import { UserRole } from "../../infrastructure/models/userRoleModel";

export interface UserRoleService {
    createUserRole(userId: number, roleId: number): Promise<UserRole>;
    deleteUserRole(userId: number, roleId: number): Promise<void>;
}
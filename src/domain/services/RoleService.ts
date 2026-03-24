import { Role } from "../../infrastructure/models/rolmodel";

export interface RoleService {
    createRole(rol: string): Promise<Role>;
    //no creo necesario los get de roles
    //getAllRoles(): Promise<Role[]>;
    //getRoleById(id: number): Promise<Role | null>;
    updateRole(id: number, rol: string): Promise<Role | null>;
    deleteRole(id: number): Promise<void>;
}

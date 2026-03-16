import { User } from "../../infrastructure/models/usermodel";

export interface UserService {
    createUser(nombre: string, usuario: string, password: string): Promise<User>;
    getUserById(id:number): Promise<{ id: number; nombre: string; usuario: string } | null >;
    getUserByUsername(usuario: string): Promise<{ id: number; nombre: string; usuario: string; password: string } | null>;
    updateUser(id: number, nombre: string, usuario: string, password: string): Promise <void>;
    deleteUser(id: number): Promise<boolean>;
}
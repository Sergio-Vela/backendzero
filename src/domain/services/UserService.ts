import { User } from "../../infrastructure/models/usermodel";

export interface UserService {
    createUser(nombre: string, apellido: string, usuario: string): Promise<User>;
    getUserById(id:number): Promise<{ id: number; nombre: string; apellido: string; usuario: string } | null >;
    getUserByUsername(usuario: string): Promise<{ id: number; nombre: string; apellido: string; usuario: string;} | null>;
    updateUser(id: number, nombre: string, apellido: string, usuario: string,): Promise <void>;
    deleteUser(id: number): Promise<boolean>;
    
}
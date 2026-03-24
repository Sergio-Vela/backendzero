import { UserService } from "../../domain/services/UserService";
import { User } from "../models/usermodel";
import { UserProfileServiceImpl } from "./ProfileServiceImpl";
import { PasswordHistoryServiceImpl } from "./PasswordHistoryServiceImpl";
import { UserRoleServiceImpl } from "./UserRoleServiceImpl";

export class UserServiceImpl implements UserService {
    async createUser(nombre: string, apellido: string, usuario: string) {
        const user: User = await User.create({nombre, apellido, usuario});
        if (!user){
            throw new Error("Error creating user");
        }else{
            console.log("User created successfully: ", user.get());
            await new UserProfileServiceImpl().createUserProfile(user.id, "", "", "");
            await new PasswordHistoryServiceImpl().createPasswordHistory(user.id, "initialPassword", new Date());
            await new UserRoleServiceImpl().createUserRole(user.id, 1);
        } 
        return user;
    }

    async getUserById(id: number){
        const user = await User.findByPk(id);
        if(!user){
            return null;
        }
        return { id: user.id, nombre: user.nombre, apellido: user.apellido, usuario: user.usuario }
    }

    async getUserByUsername(usuario: string | string[]){
        const user = await User.findOne({where: {usuario},
            attributes: ['id', 'nombre', 'apellido', 'usuario']
        });
        return user ? user.get() : null;
    }

    async updateUser(id: number, nombre: string, apellido: string, usuario: string) {
        const user = await User.findByPk(id);
        if(!user){
            return null;
        }
        user.nombre = nombre;
        user.apellido = apellido;
        user.usuario = usuario;
        await user.save();
        return user.get();
    }

    async deleteUser(id: number) {
        const user = await User.findByPk(id);
        if (!user){
            return false;
        }
        await user.destroy();
        return true;
    }



}
import { UserService } from "../../domain/services/UserService";
import { User } from "../models/usermodel";

export class UserServiceImpl implements UserService {
    async createUser(nombre: string, usuario: string, password: string) {
        const user: User = await User.create({nombre, usuario, password});
        return user;
    }

    async getUserById(id: number){
        const user = await User.findByPk(id);
        if(!user){
            return null;
        }
        return { id: user.id, nombre: user.nombre, usuario: user.usuario }
    }

    async getUserByUsername(usuario: string | string[]){
        const user = await User.findOne({where: {usuario},
            attributes: ['id', 'nombre', 'usuario']
        });
        return user ? user.get() : null;
    }

    async updateUser(id: number, nombre: string, usuario: string, password: string) {
        const user = await User.findByPk(id);
        if(!user){
            return null;
        }
        user.nombre = nombre;
        user.usuario = usuario;
        user.password = password;
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
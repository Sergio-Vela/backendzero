import { Request, Response } from "express";
import { UserServiceImpl } from "../../infrastructure/services/UserServiceImpl";
import { PasswordHistoryServiceImpl } from "../../infrastructure/services/PasswordHistoryServiceImpl";

const userService = new UserServiceImpl();
const passwordService = new PasswordHistoryServiceImpl();

export class RegisterController {

    async register(req: Request, res: Response) {
        try {
            const { nombre, apellido, usuario, password } = req.body;

            const user = await userService.createUser(nombre, apellido, usuario);

            await passwordService.createPasswordHistory(
                user.id,
                password,
                new Date()
            );

            return res.status(201).json({
                message: "Usuario registrado correctamente",
                user
            });

        } catch (error) {
            return res.status(500).json({
                error: (error as Error).message
            });
        }
    }
}
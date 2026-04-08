import { Request, Response } from "express";
import { UserServiceImpl } from "../../infrastructure/services/UserServiceImpl";
import { PasswordHistory } from "../../infrastructure/models/passwordHistoryModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = new UserServiceImpl();

const SECRET = "mi_secreto";

export class LoginController {

    async login(req: Request, res: Response) {
        try {
            const { usuario, password } = req.body;

            if (!usuario || !password) {
                return res.status(400).json({ error: "Missing credentials" });
            }

            // 1. buscar usuario
            const user = await userService.getUserByUsername(usuario) as {
                                                                            id: number;
                                                                            nombre: string;
                                                                            apellido: string;
                                                                            usuario: string;
                                                                            };

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // 2. obtener password actual
            const pw = await PasswordHistory.findOne({
                where: { userId: user.id, current: true }
            });

            if (!pw) {
                return res.status(404).json({ error: "Password not found" });
            }

            // 3. comparar password
            const isValid = await bcrypt.compare(password, pw.pwHash);

            if (!isValid) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // 4. generar token
            const token = jwt.sign(
                { id: user.id, usuario: user.usuario },
                SECRET,
                { expiresIn: "2h" }
            );

            return res.json({
                token,
                user
            });

        } catch (error) {
            return res.status(500).json({
                error: (error as Error).message
            });
        }
    }
}
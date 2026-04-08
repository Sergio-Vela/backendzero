import { Router } from "express";
import { LoginController } from "../controllers/LoginController";

const LoginRouter = Router();
const controller = new LoginController();

LoginRouter.post("/login", (req, res) => controller.login(req, res));

export default LoginRouter;
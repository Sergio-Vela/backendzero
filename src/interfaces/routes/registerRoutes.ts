import { Router } from "express";
import { RegisterController } from "../controllers/registerController";

const registerR = Router();
const registerC = new RegisterController();

registerR.post("/register", (req, res) => registerC.register(req, res));

export default registerR;
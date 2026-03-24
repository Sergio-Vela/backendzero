import { Router } from "express";
import { PasswordHistoryController } from "../controllers/PasswordHistoryController";

const passwordHistoryRoutes = Router();
const passwordHistoryController = new PasswordHistoryController();

passwordHistoryRoutes.post("/password-history", (req, res) => passwordHistoryController.createPasswordHistory(req, res));
passwordHistoryRoutes.get("/password-history/:userId", (req, res) => passwordHistoryController.getPasswordHistory(req, res));

export default passwordHistoryRoutes;

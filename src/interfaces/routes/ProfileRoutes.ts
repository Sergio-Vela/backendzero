import { Router } from "express";
import { profileController } from "../controllers/ProfileController";

const profileRoute = Router();
const controller = new profileController();

profileRoute.get("/profiles/:id", (req, res) => controller.getUserProfile(req, res));
profileRoute.put("/profiles/:id", (req, res) => controller.updateUserProfile(req, res));

export default profileRoute;

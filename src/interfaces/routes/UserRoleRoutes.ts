import { Router } from "express";
import { UserRoleController } from "../controllers/UserRoleController";

const userRoleRoutes = Router();
const userRoleController = new UserRoleController();

userRoleRoutes.post("/user-roles", (req, res) => userRoleController.createUserRole(req, res));
userRoleRoutes.delete("/user-roles/:userId/:roleId", (req, res) => userRoleController.deleteUserRole(req, res));

export default userRoleRoutes;

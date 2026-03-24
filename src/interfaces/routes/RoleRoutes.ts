import { Router } from "express";
import { RoleController } from "../controllers/RoleController";

const roleRoutes = Router();
const roleController = new RoleController();

roleRoutes.post("/roles", (req, res) => roleController.createRole(req, res));
roleRoutes.put("/roles/:id", (req, res) => roleController.updateRole(req, res));
roleRoutes.delete("/roles/:id", (req, res) => roleController.deleteRole(req, res));

export default roleRoutes;

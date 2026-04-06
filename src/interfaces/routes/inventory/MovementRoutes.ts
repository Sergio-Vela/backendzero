import { Router } from "express";
import { MovementController } from "../../controllers/inventory/MovementController";

const movementRouter = Router();
const controller = new MovementController();

movementRouter.post("/movements", (req, res) => controller.createMovement(req, res));
movementRouter.get("/movements", (req, res) => controller.getMovements(req, res));

export default movementRouter;
import { Router } from "express";
import { MaterialController } from "../../controllers/inventory/MaterialController";

const materialRouter = Router();
const controller = new MaterialController();

materialRouter.post("/materials", (req, res) => controller.createMaterial(req, res));
materialRouter.get("/materials", (req, res) => controller.getMaterials(req, res));
materialRouter.get("/materials/:id", (req, res) => controller.getMaterialById(req, res));
materialRouter.put("/materials/:id", (req, res) => controller.updateMaterial(req, res));
materialRouter.delete("/materials/:id", (req, res) => controller.deleteMaterial(req, res));

export default materialRouter;
import { Router } from "express";
import { PurchaseController } from "../../controllers/inventory/PurchaseController";

const purchaseRouter = Router();
const controller = new PurchaseController();

purchaseRouter.post("/purchases", (req, res) => controller.createPurchase(req, res));
purchaseRouter.get("/purchases", (req, res) => controller.getPurchases(req, res));

export default purchaseRouter;
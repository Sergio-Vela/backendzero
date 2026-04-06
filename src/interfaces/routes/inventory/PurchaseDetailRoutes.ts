import { Router } from "express";
import { PurchaseDetailController } from "../../controllers/inventory/PurchaseDetailController";

const purchaseDetailRouter = Router();
const controller = new PurchaseDetailController();

purchaseDetailRouter.post("/purchase-details", (req, res) => controller.createPurchaseDetail(req, res));
purchaseDetailRouter.get("/purchase-details/:purchaseId", (req, res) => controller.getPurchaseDetails(req, res));

export default purchaseDetailRouter;
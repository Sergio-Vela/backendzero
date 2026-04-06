import { Router } from "express";
import { SupplierController } from "../../controllers/inventory/SupplierController";

const supplierRouter = Router();
const controller = new SupplierController();

supplierRouter.post("/suppliers", (req, res) => controller.createSupplier(req, res));
supplierRouter.get("/suppliers", (req, res) => controller.getSuppliers(req, res));
supplierRouter.get("/suppliers/:id", (req, res) => controller.getSupplierById(req, res));
supplierRouter.put("/suppliers/:id", (req, res) => controller.updateSupplier(req, res));
supplierRouter.delete("/suppliers/:id", (req, res) => controller.deleteSupplier(req, res));

export default supplierRouter;
import { Router } from "express";
import { CategoryController } from "../../controllers/inventory/CategoryController";

const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post("/categories", (req, res) => controller.createCategory(req, res));
categoryRouter.get("/categories", (req, res) => controller.getCategories(req, res));
categoryRouter.get("/categories/:id", (req, res) => controller.getCategoryById(req, res));
categoryRouter.put("/categories/:id", (req, res) => controller.updateCategory(req, res));
categoryRouter.delete("/categories/:id", (req, res) => controller.deleteCategory(req, res));

export default categoryRouter;
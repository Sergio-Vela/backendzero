import { Router } from "express";
import { HeaderController } from "../controllers/HeaderController";

const headerRoutes = Router();
const controller = new HeaderController();

headerRoutes.post("/headers", (req, res) => controller.createHeader(req, res));
headerRoutes.get("/headers", (req, res) => controller.getHeaders(req, res));
headerRoutes.put("/headers/:id", (req, res) => controller.updateHeader(req, res));
headerRoutes.delete("/headers/:id", (req, res) => controller.deleteHeader(req, res));

export default headerRoutes;
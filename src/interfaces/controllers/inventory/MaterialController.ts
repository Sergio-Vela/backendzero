import { Request, Response } from "express";
import { MaterialServiceImpl } from "../../../infrastructure/services/inventory/MaterialServiceImpl";

const materialService = new MaterialServiceImpl();

export class MaterialController {

    async createMaterial(req: Request, res: Response) {
        try {
            const material = await materialService.createMaterial(req.body);
            res.status(201).json(material);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getMaterials(_req: Request, res: Response) {
        try {
            const materials = await materialService.getAllMaterials();
            res.json(materials);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getMaterialById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const material = await materialService.getMaterialById(id);
            if (material) {
                res.json(material);
            } else {
                res.status(404).json({ error: "Material not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateMaterial(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const material = await materialService.updateMaterial(id, req.body);
            if (material) {
                res.json(material);
            } else {
                res.status(404).json({ error: "Material not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteMaterial(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await materialService.deleteMaterial(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Material not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
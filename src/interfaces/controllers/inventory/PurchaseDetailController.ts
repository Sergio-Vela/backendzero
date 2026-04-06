import { Request, Response } from "express";
import { PurchaseDetailServiceImpl } from "../../../infrastructure/services/inventory/PurchaseDetailServiceImpl";

const service = new PurchaseDetailServiceImpl();

export class PurchaseDetailController {

    async createPurchaseDetail(req: Request, res: Response) {
        try {
            const detail = await service.createPurchaseDetail(req.body);
            res.status(201).json(detail);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getPurchaseDetails(req: Request, res: Response) {
        try {
            const purchaseId = Number(req.params.purchaseId);
            const details = await service.getPurchaseDetails(purchaseId);
            res.json(details);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getPurchaseDetailById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const detail = await service.getPurchaseDetailById(id);
            if (detail) {
                res.json(detail);
            } else {
                res.status(404).json({ error: "Purchase detail not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updatePurchaseDetail(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const detail = await service.updatePurchaseDetail(id, req.body);
            if (detail) {
                res.json(detail);
            } else {
                res.status(404).json({ error: "Purchase detail not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deletePurchaseDetail(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await service.deletePurchaseDetail(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Purchase detail not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
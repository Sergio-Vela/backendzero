import { Request, Response } from "express";
import { PurchaseServiceImpl } from "../../../infrastructure/services/inventory/PurchaseServiceImpl";

const purchaseService = new PurchaseServiceImpl();

export class PurchaseController {

    async createPurchase(req: Request, res: Response) {
        try {
            const purchase = await purchaseService.createPurchase(req.body);
            res.status(201).json(purchase);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getPurchases(_req: Request, res: Response) {
        try {
            const purchases = await purchaseService.getAllPurchases();
            res.json(purchases);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getPurchaseById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const purchase = await purchaseService.getPurchaseById(id);
            if (purchase) {
                res.json(purchase);
            } else {
                res.status(404).json({ error: "Purchase not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updatePurchase(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const purchase = await purchaseService.updatePurchase(id, req.body);
            if (purchase) {
                res.json(purchase);
            } else {
                res.status(404).json({ error: "Purchase not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deletePurchase(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await purchaseService.deletePurchase(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Purchase not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
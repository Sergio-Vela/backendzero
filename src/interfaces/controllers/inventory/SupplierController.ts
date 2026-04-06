import { Request, Response } from "express";
import { SupplierServiceImpl } from "../../../infrastructure/services/inventory/SupplierServiceImpl";

const supplierService = new SupplierServiceImpl();

export class SupplierController {

    async createSupplier(req: Request, res: Response) {
        try {
            const supplier = await supplierService.createSupplier(req.body);
            res.status(201).json(supplier);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getSuppliers(_req: Request, res: Response) {
        try {
            const suppliers = await supplierService.getAllSuppliers();
            res.json(suppliers);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getSupplierById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const supplier = await supplierService.getSupplierById(id);
            if (supplier) {
                res.json(supplier);
            } else {
                res.status(404).json({ error: "Supplier not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateSupplier(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const supplier = await supplierService.updateSupplier(id, req.body);
            if (supplier) {
                res.json(supplier);
            } else {
                res.status(404).json({ error: "Supplier not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteSupplier(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await supplierService.deleteSupplier(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Supplier not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
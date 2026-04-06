import { Request, Response } from "express";
import { HeaderServiceImpl } from "../../infrastructure/services/HeaderServiceImpl";

const headerService = new HeaderServiceImpl();

export class HeaderController {

    async createHeader(req: Request, res: Response) {
        try {
            const header = await headerService.createHeader(req.body);
            res.status(201).json(header);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getHeaders(_req: Request, res: Response) {
        try {
            const headers = await headerService.getHeaders();
            res.json(headers);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateHeader(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const header = await headerService.updateHeader(id, req.body);
            if (header) {
                res.json(header);
            } else {
                res.status(404).json({ error: "Header not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteHeader(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await headerService.deleteHeader(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Header not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
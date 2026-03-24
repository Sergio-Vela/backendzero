import { Request, Response } from "express";
import { PasswordHistoryServiceImpl } from "../../infrastructure/services/PasswordHistoryServiceImpl";

const pwHistoryService = new PasswordHistoryServiceImpl();

export class PasswordHistoryController {
    async createPasswordHistory(req: Request, res: Response) {
        try {
            const { userId, password, date } = req.body;
            const pwHistory = await pwHistoryService.createPasswordHistory(userId, password, date);
            res.status(201).json(pwHistory);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getPasswordHistory(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            if (!Number.isInteger(userId) || userId <= 0) {
                return res.status(400).json({ error: "Invalid userId parameter" });
            }

            const pwHistory = await pwHistoryService.getPasswordHistory(userId);
            return res.json(pwHistory);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

}
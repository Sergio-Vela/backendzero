import { Request, Response } from "express";
import { MovementServiceImpl } from "../../../infrastructure/services/inventory/MovementServiceImpl";

const movementService = new MovementServiceImpl();

export class MovementController {

    async createMovement(req: Request, res: Response) {
        try {
            const movement = await movementService.createMovement(req.body);
            res.status(201).json(movement);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getMovements(_req: Request, res: Response) {
        try {
            const movements = await movementService.getAllMovements();
            res.json(movements);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getMovementById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const movement = await movementService.getMovementById(id);
            if (movement) {
                res.json(movement);
            } else {
                res.status(404).json({ error: "Movement not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
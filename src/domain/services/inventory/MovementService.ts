import { Movement } from "../../../infrastructure/models/inventory/movementModel";

export interface MovementService {
  createMovement(data: {
    materialId: number;
    tipo: "IN" | "OUT";
    cantidad: number;
    motivo?: string;
  }): Promise<Movement>;
  getAllMovements(): Promise<Movement[]>;
  getMovementById(id: number): Promise<Movement | null>;
}
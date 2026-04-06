import { MovementService } from "../../../domain/services/inventory/MovementService";
import { Movement } from "../../models/inventory/movementModel";
import { MaterialServiceImpl } from "./MaterialServiceImpl";

export class MovementServiceImpl implements MovementService {

  async createMovement(data: {
    materialId: number;
    tipo: "IN" | "OUT";
    cantidad: number;
    motivo?: string;
  }): Promise<Movement> {

    // Validar y actualizar stock (lanza error si hay stock insuficiente)
    await new MaterialServiceImpl().updateStock(
      data.materialId,
      data.cantidad,
      data.tipo
    );

    return await Movement.create({
      ...data,
      fecha: new Date()
    });
  }

  async getAllMovements(): Promise<Movement[]> {
    return await Movement.findAll();
  }

  async getMovementById(id: number): Promise<Movement | null> {
    return await Movement.findByPk(id);
  }
}
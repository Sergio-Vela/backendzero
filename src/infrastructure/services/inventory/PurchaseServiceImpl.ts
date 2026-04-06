import { PurchaseService } from "../../../domain/services/inventory/PurchaseService";
import { Purchase } from "../../models/inventory/purchaseModel";
import { PurchaseDetail } from "../../models/inventory/purchaseDetailModel";
import { Movement } from "../../models/inventory/movementModel";
import { sequelize } from "../../database/sequelize";
import { MaterialServiceImpl } from "./MaterialServiceImpl";

export class PurchaseServiceImpl implements PurchaseService {

  async createPurchase(data: {
    supplierId: number;
    detalles: {
      materialId: number;
      cantidad: number;
      precioUnitario: number;
    }[];
  }): Promise<Purchase> {

    const transaction = await sequelize.transaction();

    try {
      const purchase = await Purchase.create({
        supplierId: data.supplierId,
        total: 0
      }, { transaction });

      let total = 0;

      for (const item of data.detalles) {

        const subtotal = item.cantidad * item.precioUnitario;
        total += subtotal;

        await PurchaseDetail.create({
          purchaseId: purchase.id,
          materialId: item.materialId,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          subtotal
        }, { transaction });

        //actualizar stock
        await new MaterialServiceImpl().updateStock(
          item.materialId,
          item.cantidad,
          "IN"
        );

        //registrar movimiento
        await Movement.create({
          materialId: item.materialId,
          tipo: "IN",
          cantidad: item.cantidad,
          motivo: "Compra",
          fecha: new Date()
        }, { transaction });
      }

      purchase.total = total;
      await purchase.save({ transaction });

      await transaction.commit();

      return purchase;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAllPurchases(): Promise<Purchase[]> {
    return await Purchase.findAll({
      include: [{ model: PurchaseDetail, as: 'detalles' }]
    });
  }

  async getPurchaseById(id: number): Promise<Purchase | null> {
    return await Purchase.findByPk(id, {
      include: [{ model: PurchaseDetail, as: 'detalles' }]
    });
  }

  async updatePurchase(id: number, data: {
    supplierId?: number;
  }): Promise<Purchase | null> {
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return null;
    }
    await purchase.update(data);
    return purchase;
  }

  async deletePurchase(id: number): Promise<boolean> {
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return false;
    }

    try {
      // Obtener todos los detalles de la compra y revertir stock
      const details = await PurchaseDetail.findAll({ where: { purchaseId: id } });
      
      for (const detail of details) {
        await new MaterialServiceImpl().updateStock(detail.materialId, detail.cantidad, "OUT");
      }

      // Eliminar detalles y luego la compra
      await PurchaseDetail.destroy({ where: { purchaseId: id } });
      await purchase.destroy();
      
      return true;
    } catch (error) {
      throw error;
    }
  }
}
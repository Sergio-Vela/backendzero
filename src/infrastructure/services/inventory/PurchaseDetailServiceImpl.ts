import { PurchaseDetailService } from "../../../domain/services/inventory/PurchaseDetailService";
import { PurchaseDetail } from "../../models/inventory/purchaseDetailModel";
import { Purchase } from "../../models/inventory/purchaseModel";
import { MaterialServiceImpl } from "./MaterialServiceImpl";
import { Movement } from "../../models/inventory/movementModel";

export class PurchaseDetailServiceImpl implements PurchaseDetailService {

    async createPurchaseDetail(data: {
        purchaseId: number;
        materialId: number;
        cantidad: number;
        precioUnitario: number;
    }): Promise<PurchaseDetail> {
        const subtotal = data.cantidad * data.precioUnitario;

        const detail = await PurchaseDetail.create({
            ...data,
            subtotal
        });

        try {
            // Incrementar stock
            await new MaterialServiceImpl().updateStock(data.materialId, data.cantidad, "IN");

            // Registrar movimiento
            await Movement.create({
                materialId: data.materialId,
                tipo: "IN",
                cantidad: data.cantidad,
                motivo: "Detalle de compra",
                fecha: new Date()
            });

            // Actualizar total de la compra
            const purchase = await Purchase.findByPk(data.purchaseId);
            if (purchase) {
                purchase.total += subtotal;
                await purchase.save();
            }
        } catch (error) {
            // Si algo falla, eliminar el detalle creado
            await detail.destroy();
            throw error;
        }

        return detail;
    }

    async getPurchaseDetails(purchaseId: number): Promise<PurchaseDetail[]> {
        return await PurchaseDetail.findAll({ where: { purchaseId } });
    }

    async getPurchaseDetailById(id: number): Promise<PurchaseDetail | null> {
        return await PurchaseDetail.findByPk(id);
    }

    async updatePurchaseDetail(id: number, data: {
        materialId?: number;
        cantidad?: number;
        precioUnitario?: number;
    }): Promise<PurchaseDetail | null> {
        const detail = await PurchaseDetail.findByPk(id);
        if (!detail) {
            return null;
        }

        const oldSubtotal = detail.subtotal;
        const oldCantidad = detail.cantidad;
        const oldMaterialId = detail.materialId;
        const updateData = { ...data };

        // Calcular nuevo subtotal si hay cambios en cantidad o precio
        if (data.cantidad !== undefined || data.precioUnitario !== undefined) {
            const nuevaCantidad = data.cantidad !== undefined ? data.cantidad : detail.cantidad;
            const nuevoPrecio = data.precioUnitario !== undefined ? data.precioUnitario : detail.precioUnitario;
            (updateData as any).subtotal = nuevaCantidad * nuevoPrecio;
        }

        try {
            // Si cambió la cantidad de material o el material en sí
            if (data.cantidad !== undefined) {
                // Revertir stock anterior
                await new MaterialServiceImpl().updateStock(oldMaterialId, oldCantidad, "OUT");

                // Aplicar nuevo stock
                const materialId = data.materialId !== undefined ? data.materialId : oldMaterialId;
                await new MaterialServiceImpl().updateStock(materialId, data.cantidad, "IN");
            } else if (data.materialId !== undefined) {
                // Si solo cambió el material
                await new MaterialServiceImpl().updateStock(oldMaterialId, oldCantidad, "OUT");
                await new MaterialServiceImpl().updateStock(data.materialId, detail.cantidad, "IN");
            }

            await detail.update(updateData);

            // Actualizar total de la compra si el subtotal cambió
            if (oldSubtotal !== detail.subtotal) {
                const purchase = await Purchase.findByPk(detail.purchaseId);
                if (purchase) {
                    purchase.total = purchase.total - oldSubtotal + detail.subtotal;
                    await purchase.save();
                }
            }

            return detail;
        } catch (error) {
            throw error;
        }
    }

    async deletePurchaseDetail(id: number): Promise<boolean> {
        const detail = await PurchaseDetail.findByPk(id);
        if (!detail) {
            return false;
        }

        try {
            // Revertir stock
            await new MaterialServiceImpl().updateStock(detail.materialId, detail.cantidad, "OUT");

            // Actualizar total de la compra
            const purchase = await Purchase.findByPk(detail.purchaseId);
            if (purchase) {
                purchase.total -= detail.subtotal;
                await purchase.save();
            }

            await detail.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    }
}
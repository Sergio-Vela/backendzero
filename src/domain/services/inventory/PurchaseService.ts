import { Purchase } from "../../../infrastructure/models/inventory/purchaseModel";

export interface PurchaseService {
  createPurchase(data: {
    supplierId: number;
    detalles: {
      materialId: number;
      cantidad: number;
      precioUnitario: number;
    }[];
  }): Promise<Purchase>;
  getAllPurchases(): Promise<Purchase[]>;
  getPurchaseById(id: number): Promise<Purchase | null>;
  updatePurchase(id: number, data: {
    supplierId?: number;
  }): Promise<Purchase | null>;
  deletePurchase(id: number): Promise<boolean>;
}
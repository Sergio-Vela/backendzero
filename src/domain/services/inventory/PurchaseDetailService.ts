import { PurchaseDetail } from "../../../infrastructure/models/inventory/purchaseDetailModel";

export interface PurchaseDetailService {
  createPurchaseDetail(data: {
    purchaseId: number;
    materialId: number;
    cantidad: number;
    precioUnitario: number;
  }): Promise<PurchaseDetail>;
  getPurchaseDetails(purchaseId: number): Promise<PurchaseDetail[]>;
  getPurchaseDetailById(id: number): Promise<PurchaseDetail | null>;
  updatePurchaseDetail(id: number, data: {
    materialId?: number;
    cantidad?: number;
    precioUnitario?: number;
  }): Promise<PurchaseDetail | null>;
  deletePurchaseDetail(id: number): Promise<boolean>;
}
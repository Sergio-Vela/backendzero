import { Supplier } from "../../../infrastructure/models/inventory/supplierModel";

export interface SupplierService {
  createSupplier(data: {
    nombre: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
  }): Promise<Supplier>;

  getAllSuppliers(): Promise<Supplier[]>;
  getSupplierById(id: number): Promise<Supplier | null>;
  updateSupplier(id: number, data: {
    nombre?: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
  }): Promise<Supplier | null>;
  deleteSupplier(id: number): Promise<boolean>;
}
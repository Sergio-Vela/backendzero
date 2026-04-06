import { SupplierService } from "../../../domain/services/inventory/SupplierService";
import { Supplier } from "../../models/inventory/supplierModel";

export class SupplierServiceImpl implements SupplierService {

  async createSupplier(data: {
    nombre: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
  }): Promise<Supplier> {
    return await Supplier.create(data);
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    return await Supplier.findAll();
  }

  async getSupplierById(id: number): Promise<Supplier | null> {
    return await Supplier.findByPk(id);
  }

  async updateSupplier(id: number, data: {
    nombre?: string;
    telefono?: string;
    correo?: string;
    direccion?: string;
  }): Promise<Supplier | null> {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return null;
    }
    await supplier.update(data);
    return supplier;
  }

  async deleteSupplier(id: number): Promise<boolean> {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return false;
    }
    await supplier.destroy();
    return true;
  }
}
import { MaterialService } from "../../../domain/services/inventory/MaterialService";
import { Material } from "../../models/inventory/materialModel";

export class MaterialServiceImpl implements MaterialService {

  async createMaterial(data: {
    nombre: string;
    descripcion?: string;
    categoriaId: number;
    stockActual?: number;
    stockMinimo?: number;
    unidadMedida?: string;
  }): Promise<Material> {

    const material = await Material.create({
      ...data,
      stockActual: data.stockActual ?? 0,
    });

    return material;
  }

  async getAllMaterials(): Promise<Material[]> {
    return await Material.findAll();
  }

  async getMaterialById(id: number): Promise<Material | null> {
    return await Material.findByPk(id);
  }

  async updateMaterial(id: number, data: {
    nombre?: string;
    descripcion?: string;
    categoriaId?: number;
    stockMinimo?: number;
    unidadMedida?: string;
  }): Promise<Material | null> {
    const material = await Material.findByPk(id);
    if (!material) {
      return null;
    }
    await material.update(data);
    return material;
  }

  async deleteMaterial(id: number): Promise<boolean> {
    const material = await Material.findByPk(id);
    if (!material) {
      return false;
    }
    await material.destroy();
    return true;
  }

  async updateStock(materialId: number, cantidad: number, tipo: "IN" | "OUT"): Promise<void> {
    const material = await Material.findByPk(materialId);

    if (!material) {
      throw new Error("Material not found");
    }

    if (tipo === "IN") {
      material.stockActual += cantidad;
    } else {
      if (material.stockActual < cantidad) {
        throw new Error("Stock insuficiente");
      }
      material.stockActual -= cantidad;
    }

    await material.save();
  }
}
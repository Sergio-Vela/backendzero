import { Material } from "../../../infrastructure/models/inventory/materialModel";

export interface MaterialService {
  createMaterial(data: {
    nombre: string;
    descripcion?: string;
    categoriaId: number;
    stockMinimo?: number;
    unidadMedida?: string;
  }): Promise<Material>;

  getAllMaterials(): Promise<Material[]>;

  getMaterialById(id: number): Promise<Material | null>;

  updateMaterial(id: number, data: {
    nombre?: string;
    descripcion?: string;
    categoriaId?: number;
    stockMinimo?: number;
    unidadMedida?: string;
  }): Promise<Material | null>;

  deleteMaterial(id: number): Promise<boolean>;

  updateStock(materialId: number, cantidad: number, tipo: "IN" | "OUT"): Promise<void>;
}
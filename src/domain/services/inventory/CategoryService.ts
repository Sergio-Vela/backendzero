import { Category } from "../../../infrastructure/models/inventory/categoryModel";

export interface CategoryService {
  createCategory(nombre: string, descripcion?: string): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | null>;
  updateCategory(id: number, nombre: string, descripcion?: string): Promise<Category | null>;
  deleteCategory(id: number): Promise<boolean>;
}
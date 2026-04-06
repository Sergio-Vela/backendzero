import { CategoryService } from "../../../domain/services/inventory/CategoryService";
import { Category } from "../../models/inventory/categoryModel";

export class CategoryServiceImpl implements CategoryService {

  async createCategory(nombre: string, descripcion?: string): Promise<Category> {
    return await Category.create({ nombre, descripcion });
  }

  async getAllCategories(): Promise<Category[]> {
    return await Category.findAll();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await Category.findByPk(id);
  }

  async updateCategory(id: number, nombre: string, descripcion?: string): Promise<Category | null> {
    const category = await Category.findByPk(id);
    if (!category) {
      return null;
    }
    await category.update({ nombre, descripcion });
    return category;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const category = await Category.findByPk(id);
    if (!category) {
      return false;
    }
    await category.destroy();
    return true;
  }
}
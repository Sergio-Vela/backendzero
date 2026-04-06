import { Request, Response } from "express";
import { CategoryServiceImpl } from "../../../infrastructure/services/inventory/CategoryServiceImpl";

const categoryService = new CategoryServiceImpl();

export class CategoryController {

    async createCategory(req: Request, res: Response) {
        try {
            const category = await categoryService.createCategory(req.body.nombre, req.body.descripcion);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getCategories(_req: Request, res: Response) {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const category = await categoryService.getCategoryById(id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ error: "Category not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const category = await categoryService.updateCategory(id, req.body.nombre, req.body.descripcion);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ error: "Category not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await categoryService.deleteCategory(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Category not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
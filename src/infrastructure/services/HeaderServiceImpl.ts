import { HeaderService } from "../../domain/services/HeaderService";
import { Header } from "../models/header";

export class HeaderServiceImpl implements HeaderService {

  async createHeader(data: {
    nombre: string;
    ruta: string;
    icono?: string;
    orden: number;
    activo?: boolean;
  }): Promise<Header> {
    return await Header.create(data);
  }

  async getHeaders(): Promise<Header[]> {
    return await Header.findAll({
      where: { activo: true },
      order: [["orden", "ASC"]],
    });
  }

  async updateHeader(id: number, data: {
    nombre?: string;
    ruta?: string;
    icono?: string;
    orden?: number;
    activo?: boolean;
  }): Promise<Header | null> {
    const header = await Header.findByPk(id);
    if (!header) {
      return null;
    }
    await header.update(data);
    return header;
  }

  async deleteHeader(id: number): Promise<boolean> {
    const header = await Header.findByPk(id);
    if (!header) {
      return false;
    }
    await header.destroy();
    return true;
  }
}
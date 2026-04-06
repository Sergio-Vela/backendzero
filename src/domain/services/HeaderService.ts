import { Header } from "../../infrastructure/models/header";

export interface HeaderService {
  createHeader(data: {
    nombre: string;
    ruta: string;
    icono?: string;
    orden: number;
    activo?: boolean;
  }): Promise<Header>;

  getHeaders(): Promise<Header[]>;

  updateHeader(id: number, data: {
    nombre?: string;
    ruta?: string;
    icono?: string;
    orden?: number;
    activo?: boolean;
  }): Promise<Header | null>;
  deleteHeader(id: number): Promise<boolean>;
}
export interface UserProfileDTO {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  profile: {
    id: number;
    fotoBase64: string | null;
    telefono: string | null;
    correo: string;
    biografia: string;
    fechaNac: Date | null;
    genero: string | null;
  };
}
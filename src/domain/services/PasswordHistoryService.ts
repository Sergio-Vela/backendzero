import { PasswordHistory } from "../../infrastructure/models/passwordHistoryModel";

export interface PasswordHistoryService {
    createPasswordHistory(userId:number, pwHash: string, createdAt: Date): Promise<PasswordHistory>;
    getPasswordHistory(userId: number): Promise<{id: number; pwHash: string; createdAt: Date; current: boolean;}[]>;
    updatePasswordHistory(id: number, pwHash?: string, current?: boolean): Promise<PasswordHistory | null>;
    getCurrentPassword(userId: number): Promise<{ pwHash: string } | null>;
}
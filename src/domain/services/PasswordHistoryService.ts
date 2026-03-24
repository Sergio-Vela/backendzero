import { PasswordHistory } from "../../infrastructure/models/passwordHistoryModel";

export interface PasswordHistoryService {
    createPasswordHistory(userId:number, pwHash: string, createdAt: Date): Promise<PasswordHistory>;
    getPasswordHistory(userId: number): Promise<{id: number; pwHash: string; createdAt: Date;}[]>;
}
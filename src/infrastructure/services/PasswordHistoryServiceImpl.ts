import { PasswordHistoryService } from "../../domain/services/PasswordHistoryService";
import { PasswordHistory } from "../models/passwordHistoryModel";
import bcrypt from "bcrypt";

export class PasswordHistoryServiceImpl implements PasswordHistoryService {
     async createPasswordHistory(userId: number, pwHash: string, createdAt: Date): Promise<PasswordHistory> {
        const pwhistory = await PasswordHistory.findAll({where: { userId }, attributes: ['pwHash']});

        for (const pw of pwhistory){
            const esIgual = await bcrypt.compare(pwHash, pw.pwHash);
            if (esIgual){
                throw new Error("Can't use an old password");
            }
        }

        await PasswordHistory.update(
            { current: false },
            { where: { userId, current: true } }
        );

        const newPwHash = await bcrypt.hash(pwHash,10);
        
        const createPassword: PasswordHistory = await PasswordHistory.create({
            userId: userId,
            pwHash: newPwHash,
            current: true,
            createdAt
        });
        return createPassword;
    }

    async getPasswordHistory(userId: number): Promise<{ id: number; pwHash: string; createdAt: Date; current: boolean; }[]> {
        if (!Number.isInteger(userId) || userId <= 0) {
            throw new Error("Invalid userId");
        }

        const pwHisto = await PasswordHistory.findAll({
            where: { userId },
            attributes: ['id', 'pwHash', 'createdAt', 'current'],
            order: [['createdAt', 'DESC']]
        });

        return pwHisto.map(pwh => ({
            id: pwh.id,
            pwHash: pwh.pwHash,
            createdAt: pwh.createdAt,
            current: pwh.current
        }));
    }
} 
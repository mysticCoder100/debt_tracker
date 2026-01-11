import {Model} from "@/models/Model";

export class Wallet extends Model {

    constructor() {
        super("wallets");
    }

    async getTotalDebtors<T>(): Promise<T | undefined> {
        const sql = `SELECT count(*) as total
                     from ${this.table}
                     WHERE balance > 0`;
        const result = await this.query<T>(sql);
        return result ? result[0] : undefined;
    }

    async allDebts<T>(): Promise<T | undefined> {
        const sql = `SELECT SUM(balance) as total
                     from ${this.table}`;
        const result = await this.query<T>(sql);
        return result ? result[0] : undefined;
    }

    async debtorsCount<T>(): Promise<T | undefined> {
        const sql = `SELECT SUM(CASE WHEN balance = 0 THEN 1 ELSE 0 END) AS non_debtor,
                            SUM(CASE WHEN balance > 0 THEN 1 ELSE 0 END) AS debtor
                     FROM wallets`
        const result = await this.query<T>(sql);
        return result ? result[0] : undefined;
    }
}
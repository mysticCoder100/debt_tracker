import {Model} from "@/models/Model";

export class User extends Model {

    constructor() {
        super("users");
    }

    async fetchWithWallet<T>(): Promise<T[] | undefined> {
        const sql = `SELECT u.id, u.name, u.phonenumber, w.balance
                     FROM ${this.table} u
                              JOIN wallets w ON w.user_id = u.id`;
        return await this.query<T>(sql);
    }

    async fetchWallet<T>(id: number | undefined): Promise<T | undefined> {

        if (id == undefined) {
            return undefined;
        }

        const sql = `SELECT u.id, u.name, u.phonenumber, w.balance
                     FROM ${this.table} u
                              JOIN wallets w ON w.user_id = u.id
                     WHERE u.id = ?`;

        const result = await this.query<T>(sql, [id]);
        return result ? result[0] : undefined;
    }

    async fetchTopFiveDebtors<T>(): Promise<T[] | undefined> {
        const sql = `SELECT u.id, u.name, u.phonenumber, w.balance
                     FROM ${this.table} u
                              JOIN wallets w ON w.user_id = u.id
                     ORDER BY w.balance DESC
                     LIMIT 5`;

        return await this.query<T>(sql);
    }

    async fetchBySearch<T>(search: string): Promise<T[] | undefined> {
        const sql = `SELECT u.id, u.name, u.phonenumber, w.balance
                     FROM ${this.table} u
                              JOIN wallets w ON w.user_id = u.id
                     WHERE u.name LIKE ? `;

        return await this.query<T>(sql, [`%${search}%`]);
    }

    async deleteUser(id: number): Promise<boolean> {
        const query = `DELETE
                       FROM ${this.table}
                       WHERE id = ?`;
        const result = await this.query(query, [id]);
        console.log(result)
        return result ? true : false;
    }

}
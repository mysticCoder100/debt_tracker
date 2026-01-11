import {Model} from "@/models/Model";

export default class Transaction extends Model {
    constructor() {
        super("transactions");
    }

    async userTransaction<T>(userId: number): Promise<T[] | undefined> {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE user_id = ?
                     ORDER BY created_at DESC`;

        return await this.query<T>(sql, [userId]);
    }

}
import {Pool} from "mysql2/promise"
import Database from "@/lib/Database";

export abstract class Model {
    protected table: string;

    protected connection: Pool;

    constructor(tableName: string) {
        this.table = tableName;
        this.connection = Database.getInstance();
    }

    async query<T>(sql: string, params?: (string | number)[]): Promise<T[] | undefined> {
        try {
            const [results] = await this.connection.execute(sql, params);
            return results as T[];
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Query failed: ${error.message}`);
            }
        }
    }

    async fetchAll<T>(columns: string[]): Promise<T[] | undefined> {
        return this.query<T>(`SELECT ${columns.join(", ")}
                              FROM ${this.table}`);
    }

    async insert<T>(data: (string | number)[], columns: string[]): Promise<boolean | undefined> {
        const query = `INSERT INTO ${this.table}(${columns.join(", ")})
                       VALUES (${Array(data.length).fill("?").join(", ")})`;
        await this.query<T>(query, data);
        return true;
    }

    async fetch<T>(id: number | undefined): Promise<T[] | undefined> {
        if (id == undefined) {
            return [];
        }
        const query = `SELECT *
                       FROM ${this.table}
                       WHERE id = ?`;

        return this.query<T>(query, [id])
    }

    async count<T>(): Promise<T | undefined> {
        const sql = `SELECT COUNT(*) as total
                     FROM ${this.table}`;
        const result = await this.query<T>(sql);
        return result ? result[0] : undefined;
    }

    async countWhere<T>(where: string, params: string | number): Promise<T | undefined> {
        const sql = `SELECT COUNT(*) as total
                     FROM ${this.table}
                     WHERE ${where} = ?`;
        const result = await this.query<T>(sql, [params]);
        return result ? result[0] : undefined;
    }
}
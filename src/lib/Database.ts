import mysql, {Pool} from "mysql2/promise";

export default class Database {
    private static instance: Pool;

    public static getInstance(): Pool {
        if (!Database.instance) {
            Database.instance = mysql.createPool({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }
        return Database.instance;
    };
}
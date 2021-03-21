import { Pool, QueryResult } from 'pg';
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
console.log("Creating Pool");

export type QueryCallback<T> = (error: Error, result: QueryResult<T>) => void

export const query = <T>(text: string, params: any[], callback: QueryCallback<T>) => {
    return pool.query(text, params, callback);
}
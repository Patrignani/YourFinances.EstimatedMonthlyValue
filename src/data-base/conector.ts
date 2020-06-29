import { Pool, Client } from 'pg';
import { SystemConfig } from "../config/system-config";

export class Connector {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: SystemConfig.CONNECTION_STRING_PG,
        });
    }

    async ExecQueryAsync(query: string, object?: any[]) {
        const client = await this.pool.connect();
        let res: any;

        if (object)
            res = await client.query(query, object);
        else
            res = await client.query(query);

        return res;
    }

    async ExecInsertAsync(query: string, object: any[]) {
        const client = await this.pool.connect();
        const res = await client.query(query, object);

        return res;
    }
}
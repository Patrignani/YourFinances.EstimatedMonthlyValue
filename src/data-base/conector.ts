import { Pool, Client } from 'pg';
import { SystemConfig } from "../config/system-config";

export class Connector {
    private pool: Pool;

    constructor(notstartPool?: boolean) {
        if (!notstartPool) {

            this.pool = new Pool({
                connectionString: SystemConfig.CONNECTION_STRING_PG,
            });
        }
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

    async CreateDatabase() {

        console.log("CreateDatabase >>")
        let strCon = SystemConfig.CONNECTION_STRING_PG;

        const app = strCon.substring(strCon.lastIndexOf('/'), strCon.length);
        let databaseName = app.substring(1, app.length)

        let dbCon = strCon.replace(app, '');

        let con = new Pool({
            connectionString: dbCon,
        });
   
        let query = 'SELECT COUNT(datname) FROM pg_database WHERE datname = $1';

        const client = await con.connect();
        let res = await client.query(query, [databaseName]);
        let count = parseInt(res.rows.map(count => count["count"])[0]);
        if (count <= 0) {
            console.log("Criando Database ...")
            let dataBase = `CREATE DATABASE "${databaseName}" WITH
            OWNER = postgres
            ENCODING = 'UTF8'
            CONNECTION LIMIT = -1`;

            await client.query(dataBase);

            console.log("Concluido!")
        }

        
        console.log("Fim Database")
    }

}
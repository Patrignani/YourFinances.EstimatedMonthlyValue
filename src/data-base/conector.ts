import { Pool, Client } from 'pg';
import { SystemConfig } from "../config/system-config";

export class Connector {

    GetClient() {
        let  pool = new Pool({
            connectionString: SystemConfig.CONNECTION_STRING_PG,
        });

        return pool.connect();;
    }

    CloseConnection(client) {
        client.release();
    }

    async ExecQueryAsync(query: string, object?: any[]) {
     
        const client = await this.GetClient();
        let res: any;

        if (object)
            res = await client.query(query, object);
        else
            res = await client.query(query);

        this.CloseConnection(client);

        return res;
    }

    async ExecInsertAsync(query: string, object: any[]) {
      
        const client = await this.GetClient();
        const res = await client.query(query, object);
        this.CloseConnection(client);
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

        this.CloseConnection(client);
        console.log("Fim Database")
    }

}
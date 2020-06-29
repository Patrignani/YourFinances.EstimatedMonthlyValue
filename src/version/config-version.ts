import { V1, CreateVersionDb } from './versions/v-1'
import { Connector } from "../data-base/conector"
import Ramda from 'ramda';

const versionApplication = 1;

const getVersion = async () => {
    console.log('getVersion');
    let verionReturn = 0;
    try {
        let script = `SELECT version FROM PUBLIC."version" WHERE application= $1
        ORDER BY dateupdate DESC
        FETCH FIRST 1 ROWS ONLY` ;

        let connection = new Connector();
        let version = await connection.ExecQueryAsync(script, ['YourFinances.EstimatedMonthlyValue']);
        const result = version.rows.map(version => version["version"]);

        if (result.length > 0)
            verionReturn = result[0];
    }
    catch (e) {
        console.log('getEversion >>' + e.stack);
        let error = e.stack
        if (!(error && error.stack && error.stack.indexOf('does not exist') > 0)) {
            await CreateVersionDb();
        }
    }

    return verionReturn;
}

export async function CheckVersion() {
    console.log("CheckVersion");
    let version = await getVersion();
    console.log("CheckVersion >> versão atual: " + version);

    if (version < versionApplication) {
        switch (version) {
            case 0:
                await V1();
                break;
        }
    }
}
import { V1, CreateVersionDb } from './versions/v-1'
import { Connector } from "../data-base/conector"

const versionApplication = 1;

const getVersion = async () => {
    console.log('getVersion');
    let verionReturn = 0;
    let connection = new Connector();
    try {
        let script = `SELECT "Version" FROM PUBLIC."Version" WHERE "Application"= $1
        ORDER BY "DateUpdate" DESC
        FETCH FIRST 1 ROWS ONLY` ;

        let version = await connection.ExecQueryAsync(script, ['YourFinances.EstimatedMonthlyValue']);
        const result = version.rows.map(version => version["Version"]);

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
    let connection = new Connector();
    await connection.CreateDatabase();
    console.log("CheckVersion");
    let version = await getVersion();
    console.log("CheckVersion >> versão atual: " + version);

    updateVersions(version);
}

const updateVersions = async (version)=>{
    switch (version) {
        case 0:
            version =await V1();
            await executeVersion(version);
            await updateVersions(version);
            break;
        default:
            break;    
    }

}

const executeVersion = async(version) =>{
    const con = new Connector();

    let insertVersion = `
    INSERT INTO public."Version"(
         "Version", "Application", "DateUpdate")
        VALUES ($1, $2, $3);
    `

    await con.ExecInsertAsync(insertVersion,[version,'YourFinances.EstimatedMonthlyValue', new Date()]);
}
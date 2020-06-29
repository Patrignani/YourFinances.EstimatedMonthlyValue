import { Connector } from "../../data-base/conector";

export async function CreateVersionDb(){
    console.log('iniciou CreateVersionDb');

    const con = new Connector();

    let tableVersion = `
    CREATE TABLE Version(
     Id SERIAL PRIMARY KEY,
     Version VARCHAR (50) UNIQUE NOT NULL,
     Application VARCHAR (50) UNIQUE NOT NULL,
     DateUpdate TIMESTAMP
 );
    `
 
    await con.ExecQueryAsync(tableVersion);
    console.log('Fim CreateVersionDb');
}

 export async function V1(){
    console.log('iniciou v1...');
    const con = new Connector();
    const version =1;

    
    let insertVersion = `
    INSERT INTO public.version(
         version, application, dateupdate)
        VALUES ($1, $2, $3);
    `

    await con.ExecInsertAsync(insertVersion,[version,'YourFinances.EstimatedMonthlyValue', new Date()]);
    console.log('v1 - Cadastrou versão');

    

    console.log('Fim v1');
}
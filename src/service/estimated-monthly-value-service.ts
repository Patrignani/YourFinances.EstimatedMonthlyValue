import { Connector } from "../data-base/conector"
import { IEstimatedMonthlyValue, ValidEstimatedMonthlyValue } from "../models/estimated-monthly-value";
import { EstimatedMonthlyValueFilter } from "../models/filters/estimated-monthly-value-filter";


export async function InsertAsync(estimatedMonthlyValue: IEstimatedMonthlyValue) {
    let value = ValidEstimatedMonthlyValue(estimatedMonthlyValue);

    if (value.success) {
        let con = new Connector();

        let script = `
        INSERT INTO public."EstimatedMonthlyValue"(
             "Identification", "Value", "AccountId", "Active", "CashFlowGrouping", "DateUpdate", "EditionUserId")
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "Id";
        `

        let result = await con.ExecInsertAsync(script, [estimatedMonthlyValue.identification, estimatedMonthlyValue.value,
        estimatedMonthlyValue.accountId, estimatedMonthlyValue.active, estimatedMonthlyValue.cashFlowGrouping,
        estimatedMonthlyValue.dateUpdate, estimatedMonthlyValue.editionUserId]);

        let id = result.rows.map(value => value["Id"]);

        if (id && id.length > 0) {
            value.data.id = id[0];
        }
    }

    return value;
}

export async function GetByIdAsync(id: number, accountId: number) {
    let valueReturn: IEstimatedMonthlyValue;

    let script = `SELECT "Id", "Identification", "Value", "AccountId", "Active", "CashFlowGrouping", "DateUpdate", "EditionUserId"
    FROM public."EstimatedMonthlyValue" WHERE "Id"=$1 AND "AccountId"=$2;`

    let con = new Connector();

    let values = await con.ExecQueryAsync(script, [id, accountId]);

    let value = values.rows;

    if (value && value.length > 0) {
        valueReturn = value;
    }

    return valueReturn;
}

export async function ActiveInactive(active: boolean, editionUserId: number, id: number) {
    let script = `UPDATE public."EstimatedMonthlyValue" SET "Active"=$1,
    "DateUpdate"=$2, "EditionUserId"=$3 WHERE "Id"=$4;`

    let con = new Connector();

    await con.ExecQueryAsync(script, [active, new Date(), editionUserId, id]);
}

export async function UpdateAsync(estimatedMonthlyValue: IEstimatedMonthlyValue) {

    let value = ValidEstimatedMonthlyValue(estimatedMonthlyValue);

    if (value.success) {
        let con = new Connector();

        let script = `
        UPDATE public."EstimatedMonthlyValue" SET 
             "Identification" = $1, "Value"= $2, "Active"= $3, "CashFlowGrouping"= $4, "DateUpdate"= $5, 
             "EditionUserId"= $6 WHERE "Id" = $7
        `
        console.log(await con.ExecInsertAsync(script, [estimatedMonthlyValue.identification,estimatedMonthlyValue.value,
            estimatedMonthlyValue.active,estimatedMonthlyValue.cashFlowGrouping,estimatedMonthlyValue.dateUpdate,
            estimatedMonthlyValue.editionUserId, estimatedMonthlyValue.id]))
    }

    return value;
}


export async function DeleteAsync(id:number){
    let script = `
        DELETE FROM public."EstimatedMonthlyValue" WHERE "Id"= $1
    `
    let con = new Connector();
    await con.ExecQueryAsync(script, [id]);
}

export async function GetAll(filter: EstimatedMonthlyValueFilter){
    let con = new Connector();

    let db = await con.ExecQueryAsync(filter.GetScript(), filter.GetObject());
    return db.rows;
}
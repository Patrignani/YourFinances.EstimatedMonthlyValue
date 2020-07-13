
import { Schema } from 'mongoose';
import { ResultModel } from "./response/result-model";
import { IResultModel } from "./interfaces/result-model";

export interface IEstimatedMonthlyValue {
    id: number;
    identification: string;
    value: Number;
    accountId: Number;
    active: boolean;
    editionUserId: Number;
    cashFlowGrouping: Schema.Types.ObjectId;
    dateUpdate:Date;
}

export function ValidEstimatedMonthlyValue(estimatedMonthlyValue: IEstimatedMonthlyValue): IResultModel<IEstimatedMonthlyValue> {

    let value = new ResultModel<IEstimatedMonthlyValue>();

    if (!estimatedMonthlyValue.identification) {
        value.messages.push("Campo Identificação é obigatória!")
    }
    else if (estimatedMonthlyValue.identification.trim().length < 1) {
        value.messages.push("Identificação tem que conter no mínimo 1 caracter!")
    }
    else if (estimatedMonthlyValue.identification.trim().length > 200) {
        value.messages.push("Identificação tem que conter no máximo 200 caracter!")
    }

    if (!estimatedMonthlyValue.value) {
        value.messages.push("Campo Valor é obigatória!")
    }
    if (!estimatedMonthlyValue.accountId) {
        value.messages.push("Campo Conta Id é obigatória!")
    }
    if (!estimatedMonthlyValue.cashFlowGrouping) {
        value.messages.push("Campo Agrupamento de fluxos de caixa é obigatória!")
    }
    else if(estimatedMonthlyValue.cashFlowGrouping.length < 12){
        value.messages.push("Campo Agrupamento de fluxos de caixa é inválido!")
    }
    if (!estimatedMonthlyValue.active) {
        value.messages.push("Campo 'Ativo?' é obigatória!")
    }
    if (!estimatedMonthlyValue.editionUserId) {
        value.messages.push("Id do usuário de edição é obigatória!")
    }

    value.success = value.messages.length == 0;

    value.data = estimatedMonthlyValue;

    return value;
}
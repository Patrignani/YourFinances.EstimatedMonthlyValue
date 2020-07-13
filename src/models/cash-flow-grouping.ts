import { Schema, model } from 'mongoose';
import { IResultModel } from './interfaces/result-model';
import { ResultModel } from './response/result-model';

export enum TypeBox {
    Output = -1,
    Input = 1
};

export interface ICashFlowGrouping {
    active: boolean;
    identification: string;
    accountId: number;
    typeBox: number;
    editionUserId:number;
}



const CashFlowGroupingSchema: Schema = new Schema({
    identification: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        require: true
    },
    accountId:
    {
        type: Number,
        require: true
    },
    typeBox: {
        type: Number,
        require: true
    },
    editionUserId:
    {
        type: Number,
        require: true
    }
},
{
    timestamps: true,
});

export default model<ICashFlowGrouping>('CashFlowGrouping', CashFlowGroupingSchema);
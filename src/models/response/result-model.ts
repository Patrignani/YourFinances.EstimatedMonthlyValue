import { IResultModel } from "../interfaces/result-model";

export class ResultModel<T> implements IResultModel<T>{
    public success: boolean;   
    public messages: string[];
    public data: T;

    constructor()
    {
        this.messages = [];
        this.success = false;
    }

}
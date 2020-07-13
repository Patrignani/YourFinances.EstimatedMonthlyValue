export interface IResultModel<T> {
    success: boolean;
    messages:string[];
    data: T;
}

import { ResultModel } from "../models/response/result-model";
import { IEstimatedMonthlyValue } from "../models/estimated-monthly-value";
import * as  noder from 'noder.io';
import { Ioc } from "../config/ioc";
import * as service from "../service/estimated-monthly-value-service";
import CashFlowGrouping from "../models/cash-flow-grouping";
import { EstimatedMonthlyValueFilter } from "../models/filters/estimated-monthly-value-filter";



export async function GetAll(req: any, res: any) {
    try {

        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        var filter = new EstimatedMonthlyValueFilter(req, result);
      
        res.status(200).json(await service.GetAll(filter));
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

export async function Post(req: any, res: any) {

    let value = new ResultModel<IEstimatedMonthlyValue>();

    try {

        let result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        const cashFlowGrouping = await CashFlowGrouping
            .findOne({ _id: req.body.cashFlowGrouping, accountId: result.Account_Id });

        if (cashFlowGrouping) {
            let estimatedMonthlyValue: IEstimatedMonthlyValue =
            {
                id: 0,
                dateUpdate: new Date(),
                active: req.body.active,
                identification: req.body.identification,
                accountId: result.Account_Id,
                editionUserId: result.Id_User,
                value: req.body.value,
                cashFlowGrouping: req.body.cashFlowGrouping
            };

            value = await service.InsertAsync(estimatedMonthlyValue);
        }
        else {
            value.success = false;
            value.messages.push("Agrupamento de fluxos de caixa não encontrado");

        }
        if (value.success) {
            res.status(201).json(value);
        }
        else {
            res.status(400).json(value);
        }
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function GetById(req: any, res: any) {
    let value = new ResultModel<IEstimatedMonthlyValue>();
    try {
        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        const estimatedMonthlyValue = await service.GetByIdAsync(req.params.id, result.Account_Id);

        value.data = estimatedMonthlyValue;

        res.status(200).json(value);
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function ActiveInactive(req: any, res: any) {
    let value = new ResultModel<IEstimatedMonthlyValue>();
    try {

        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        await service.ActiveInactive(req.body.active, result.Id_User, req.params.id);
        value.data = await service.GetByIdAsync(req.params.id, result.Account_Id);

        res.status(200).json(value);
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function Put(req: any, res: any) {

    let value = new ResultModel<IEstimatedMonthlyValue>();

    try {

        let result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        const cashFlowGrouping = await CashFlowGrouping
            .findOne({ _id: req.body.cashFlowGrouping, accountId: result.Account_Id });

        if (cashFlowGrouping) {
            let estimatedMonthlyValue: IEstimatedMonthlyValue =
            {
                id: req.params.id,
                dateUpdate: new Date(),
                active: req.body.active,
                identification: req.body.identification,
                accountId: result.Account_Id,
                editionUserId: result.Id_User,
                value: req.body.value,
                cashFlowGrouping: req.body.cashFlowGrouping
            };

            value = await service.UpdateAsync(estimatedMonthlyValue);
        }
        else {
            value.success = false;
            value.messages.push("Agrupamento de fluxos de caixa não encontrado");

        }

        if (value.success) {
            res.status(200).json(value);
        }
        else {
            res.status(400).json(value);
        }
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function Delete(req: any, res: any) {
    let value = new ResultModel<any>();
    try {

        await service.DeleteAsync(req.params.id);
        value.success = true;
        res.status(200).json(value);
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

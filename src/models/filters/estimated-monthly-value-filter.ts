import { BasicFilter } from "./basic-filter";

export class EstimatedMonthlyValueFilter extends BasicFilter {

    public Active?: boolean;
    public Identification?: string;
    public CashFlowGrouping?: string;


    constructor(req: any, token: any) {

        super(req, token)

        if (req.query) {
            this.Active = this.Filters.active;
            this.Identification = this.Filters.identification;
            this.CashFlowGrouping = this.Filters.cashflowgrouping;
        }
    }

    GetScript(): string {
        var parameters = 1;
        var perPage = (this.Page - 1) * this.Top;

        let query = `SELECT "Id", "Identification", "Value", "AccountId", "Active", "CashFlowGrouping",
         "DateUpdate", "EditionUserId"
        FROM public."EstimatedMonthlyValue" 
            WHERE "AccountId" = ${this.AccountId} **WHERE**    
        LIMIT ${this.Top}
        OFFSET ${perPage}`;

        let where = [];

        if (this.Identification) {
            where.push(` "Identification" LIKE '%' || $${parameters} || '%' `)
            parameters++;
        }

        if (this.Active){
            where.push(` "Active" = $${parameters} `)
            parameters++;
        }

        if (this.CashFlowGrouping){
            where.push(` "CashFlowGrouping" = $${parameters} `)
            parameters++;
        }

        if (where.length > 0) {

            let value = where.join(" AND ")
            query = query.replace("**WHERE**", "AND " + value)
        }
        else {

            query = query.replace("**WHERE**", "")
        }

        return query;
    }

    GetObject(): any[] {

        var obj = [];
        if (this.Identification)
            obj.push(this.Identification);

        if (this.Active)
            obj.push(this.Active);

        if (this.CashFlowGrouping)
            obj.push(this.CashFlowGrouping);

        return obj;
    }

}
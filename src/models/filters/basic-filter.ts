export class BasicFilter {
    public Top: number;
    public Page: number;
    public AccountId: number;
    public Sort: string;
    public Filters: any;

    constructor(req: any, token: any) {

        if (req.query) {
            this.Filters ={};

            Object.getOwnPropertyNames(req.query).forEach((element) =>{

                this.Filters[element.toLowerCase()] = req.query[element];
            });
          
            if ( this.Filters.top) {
                this.Top = parseInt( this.Filters.top);
            }
            else {
                this.Top = 10;
            }

            if ( this.Filters.page) {
                this.Page = parseInt( this.Filters.page);
            }
            else {
                this.Page = 1;
            }

            if ( this.Filters.sort) {
                this.Sort =  this.Filters.sort;
            }
            else {
                this.Sort = 'field';
            }
        }
        else {
            this.Top = 10;
            this.Page = 1;
            this.Sort = 'field';
        }

        this.AccountId = token.Account_Id;
    }
}
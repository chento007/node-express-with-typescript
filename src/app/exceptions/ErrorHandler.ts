export class ErrorHandler extends Error{
    message:any;
    status:number;

    constructor(message:any,status:number){
        super(message);
        this.message=message;
        this.status=status
        Error.captureStackTrace(this, this.constructor)
    }
}
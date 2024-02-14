export class BaseRest {
    status: boolean;
    code: number;
    message: any;
    timestamp: Date;
    data?: any;

    constructor({ status, code, message = '', data = null, timestamp = new Date() }: 
        { status: boolean; code: number; message?: any; data?: any; timestamp?: Date }) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.timestamp = timestamp;
        this.data = data;
    }
}


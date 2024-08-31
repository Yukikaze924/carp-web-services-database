import ResponseType from "@/enums/ResponseType";
import IResponse from "@/interfaces/IResponse";


export default class BadResponse implements IResponse
{
    type: ResponseType;
    status: number | string;
    message: string;

    constructor(type: ResponseType, status: number | string, message: string)
    {
        this.type = type
        this.status = status
        this.message = message
    }
}
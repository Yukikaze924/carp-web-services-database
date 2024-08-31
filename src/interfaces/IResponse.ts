import ResponseType from "@/enums/ResponseType"


export default interface IResponse
{
    type: ResponseType
    status: number | string
    message?: string
}
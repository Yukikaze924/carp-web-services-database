import ResponseType from "@/enums/ResponseType";
import IProduct from "@/interfaces/IProduct";
import IResponse from "@/interfaces/IResponse";

export default class ProductsResponse implements IResponse
{
    type: ResponseType;
    status: string | number;
    message?: string;
    rowCount: number;
    products: IProduct[];

    constructor(type: ResponseType, status: number, count: number, products: IProduct[]) {
        this.type = type
        this.status = status
        this.rowCount = count
        this.products = products
    }
}
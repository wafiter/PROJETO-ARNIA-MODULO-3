import { RepProduct } from "../../entities/product";

export interface ProductData {
    name:string,
    value: string,
    amount: number,
    description: string,
    photo: string,
}

export interface ProductRepository { 
    create(productData: ProductData): Promise<void>
    findAll(): Promise<RepProduct[]>
}
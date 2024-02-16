import { ObjectId } from "mongoose";
import { RepProduct } from "../../entities/product";

export interface ProductData {
    name:string,
    value: string,
    amount: number,
    description: string,
    photo: string,
}

export interface ProductRepository {
    updateProduct(id: string, product: RepProduct): void; 
    create(productData: ProductData): Promise<void>
    findAll(): Promise<RepProduct[]>
    findById(id: string): Promise<RepProduct | null>
}
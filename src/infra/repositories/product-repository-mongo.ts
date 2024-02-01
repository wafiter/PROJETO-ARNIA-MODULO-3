import { ProductData, ProductRepository } from "../../applications/repositories/product-repository";
import { ProductModel } from "../../entities/product";

export class ProductRepositoryMogo implements ProductRepository {

    async create(productData: ProductData): Promise<void> {
        await ProductModel.create(productData)
    }
    async findAll() {

    return ProductModel.find({amount: {$gt: 0}}) 
    
    }

}
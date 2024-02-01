import { CreateProductUseCase } from "../../applications/usecases/produtct/create-product-use-case";
import { CreateProductController } from "../controllers/products/create-product-controller";
import { AdminRepositoryMongo } from "../repositories/admin-repository-mongo";
import { ProductRepositoryMogo } from "../repositories/product-repository-mongo";

export class MakeCreateProduct { 
    static make () {
        const admRepository = new AdminRepositoryMongo()
        const productRepository = new ProductRepositoryMogo()
        const createProductUseCase = new CreateProductUseCase(productRepository, admRepository)
        const createProductController = new CreateProductController(createProductUseCase)
        return createProductController
    }
}
import { EditProductUseCase } from "../../applications/usecases/produtct/edit-product-use-case"
import { EditProductController } from "../controllers/products/edit-product-controller"
import { AdminRepositoryMongo } from "../repositories/admin-repository-mongo"
import { ProductRepositoryMogo } from "../repositories/product-repository-mongo"


export class MakeEditProduct { 
    static make () {
        const admRepository = new AdminRepositoryMongo()
        const productRepository = new ProductRepositoryMogo()
        const editProductUseCase = new EditProductUseCase(productRepository, admRepository)
        const createProductController = new EditProductController(editProductUseCase)
        return createProductController
    }
}
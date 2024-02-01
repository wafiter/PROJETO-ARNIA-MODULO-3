import { ListProductsUseCase } from "../../applications/usecases/produtct/list-products-use-case";
import { ListProductController } from "../controllers/products/list-product-controller";
import { ProductRepositoryMogo } from "../repositories/product-repository-mongo";
import { AdminRepositoryMongo } from "../repositories/admin-repository-mongo";
export class MakeProductList {
    static make () {
        const repository = new ProductRepositoryMogo()
        const adminRepository = new AdminRepositoryMongo()
        const usecase = new ListProductsUseCase(repository, adminRepository)
        const controller = new ListProductController(usecase)
        return controller
    }
}
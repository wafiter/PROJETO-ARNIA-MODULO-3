import { FindByIdUseCase } from "../../applications/usecases/produtct/find-product-id-use-case";
import { FindProductIdController } from "../controllers/products/find-product-id-controller";
import { ProductRepositoryMogo } from "../repositories/product-repository-mongo";

export class MakeFindProductId {
    static make() {
        const repository = new ProductRepositoryMogo ()
        const usecase = new FindByIdUseCase (repository)
        const controller = new FindProductIdController(usecase)
        return controller
    } 

}
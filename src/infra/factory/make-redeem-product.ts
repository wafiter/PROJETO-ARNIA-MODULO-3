import { RedeemProductUseCase } from "../../applications/usecases/produtct/redeem-product-use-case";
import { RedeemProductController } from "../controllers/products/redeem-product-controller";
import { ProductRepositoryMogo } from "../repositories/product-repository-mongo";
import { UserRepositoryMogo } from "../repositories/user-repository-mogo";

export class MakeRedeemProduct { 
    static make() {
       const productRepository = new ProductRepositoryMogo()
       const userRepository = new UserRepositoryMogo()
       const usecase = new RedeemProductUseCase (productRepository, userRepository)
       const controller = new RedeemProductController(usecase)
       return controller 
    }
}
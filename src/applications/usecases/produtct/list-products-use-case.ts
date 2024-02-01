import { AdminRepository } from "../../repositories/admin-repository";
import { ProductRepository } from "../../repositories/product-repository";

export class ListProductsUseCase {
    
    constructor(
        private productRepository: ProductRepository,
        private admRepository: AdminRepository
      ) {}

    async execute(id: string) {
        const adm = await this.admRepository.findByID(id);
        if (!adm) {
          throw new Error("This user is not an admin");
        }
        
        const allProducts = await this.productRepository.findAll()        
        

        return allProducts
    }
    
}



  
   
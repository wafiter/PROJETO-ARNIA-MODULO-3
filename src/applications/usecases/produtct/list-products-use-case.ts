import { ProductRepository } from "../../repositories/product-repository";

export class ListProductsUseCase {
    
    constructor(
        private productRepository: ProductRepository        
      ) {}

    async execute() {
       
        const allProducts = await this.productRepository.findAll()        
        

        return allProducts
    }
    
}



  
   
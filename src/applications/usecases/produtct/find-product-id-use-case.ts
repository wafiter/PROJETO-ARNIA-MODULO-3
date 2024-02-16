
import { ProductRepository } from "../../repositories/product-repository";

export class FindByIdUseCase {
    
    constructor(
        private productRepository: ProductRepository,
       
      ) {}

    async execute(id: string) {        
        
        const product = await this.productRepository.findById(id)       
        
        

        return product
    }
    
}
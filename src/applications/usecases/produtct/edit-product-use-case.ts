import { RepProduct } from "../../../entities/product";
import { AdminRepository } from "../../repositories/admin-repository";
import { ProductRepository } from "../../repositories/product-repository";
export class EditProductUseCase {
    
    constructor(
        private productRepository: ProductRepository,
        private adminRepository: AdminRepository
       
      ) {}

    async execute(product: RepProduct, admin: string,) {      
      const id = product._id  
      
    try {
        const adm = await this.adminRepository.findByID(admin);
        if (!adm) {
          throw new Error("unauthorized");
        }
  
        const productExiste = await this.productRepository.findById(id);
  
        if (!productExiste) {
          throw new Error("Product Not Found");
        }
  
        const result = this.productRepository.updateProduct(productExiste.id, product);
  
        return result;
      } catch (error) {
        throw new Error(error);
      }
                
                
    }
    
}


import { AdminRepository } from "../../repositories/admin-repository";
import { 
  ProductRepository,
} from "../../repositories/product-repository";

export interface Data {
  id: string, 
  name:string,
  value: string,
  amount: number,
  description: string,
  photo: string,
}


export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private admRepository: AdminRepository
  ) {}

  async execute({ id, name, value, amount, description, photo }: Data) {
    
    const adm = await this.admRepository.findByID(id);
    
    if (!adm) {
      throw new Error("This user is not an admin");
    }

    const productData = { name, value, amount, description, photo }

    
    
    const result = await this.productRepository.create(productData);

    return result;
  }
}

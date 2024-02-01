import { AdminRepository } from "../../repositories/admin-repository";
import { 
  ProductRepository,
} from "../../repositories/product-repository";

export interface Data {
  adminId: string, 
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

  async execute({ adminId, name, value, amount, description, photo }: Data) {
    
    const adm = await this.admRepository.findByID(adminId);
    console.log(adminId)
    if (!adm) {
      throw new Error("This user is not an admin");
    }

    const productData = { name, value, amount, description, photo }
    
    const result = await this.productRepository.create(productData);

    return result;
  }
}

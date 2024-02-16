import {
  ProductData,
  ProductRepository,
} from "../../applications/repositories/product-repository";
import { ProductModel, RepProduct } from "../../entities/product";

export class ProductRepositoryMogo implements ProductRepository {
  async create(productData: ProductData): Promise<void> {
    try {
      await ProductModel.create(productData);
    } catch (error) {
      throw new Error("Unable to create product in database");
    }
  }

  async findAll() {
    return await ProductModel.find({ amount: { $gt: 0 } });
  }

  async findById(id: string): Promise<RepProduct | null> {
    try {
      const product = await ProductModel.findById(id);

      return product;
    } catch (error) {      
      throw new Error("ID NOT FOUND IN THE DATABASE")
    }
  }

  async updateProduct(id: string, product: RepProduct) {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(id, product);

      return updateProduct?.updatedAt;
    } catch (error) {
      throw new Error('id or product, not found in the database');
    }
  }
}

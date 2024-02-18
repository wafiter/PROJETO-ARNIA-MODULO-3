import { ProductRepository } from "../../repositories/product-repository";
import { UserRepository } from "../../repositories/user-repository";
export class RedeemProductUseCase {
    
    constructor(
        private productRepository: ProductRepository,
        private userRepository: UserRepository         
      ) {}

    async execute(userId: string, productId: string, price: number) {
      
        const userExist = await this.userRepository.findById(userId);
        const productExist = await this.productRepository.findById(productId);

        console.log(userExist, productExist, productExist?.amount)
        
        if (userExist && productExist && productExist.amount > 0) {            
            

            if (enoughJewels(userExist.jewelsAmount, price)) {
                
                deductJewels(userExist.jewelsAmount, price)
                
                userExist.products.push(productExist._id)

                productExist.amount -= 1

                await this.productRepository.updateProduct(productExist._id, productExist)
                await this.userRepository.updateUser(userExist._id, userExist)

                return ("Successfully, the product has been added to your pack")
                

            } else {
                throw new Error("User does not have enough gems to redeem this product")
            }
        } else {
            throw new Error("Product not found or product out of stock")
        }
    }
    
}


function enoughJewels(jewelsAmount: any, price: number): boolean {
    
    const totalJewels = jewelsAmount.power + jewelsAmount.mind + jewelsAmount.space
    return totalJewels >= price;
}

function deductJewels(jewelsAmount: any, requiredAmount: number): void {
   
    const totalJewels = jewelsAmount.power + jewelsAmount.mind + jewelsAmount.space
    const remainingJewels = totalJewels - requiredAmount
    
    
    const jewelsForEach = (remainingJewels / 3) 
    jewelsAmount.power = jewelsForEach
    jewelsAmount.mind = jewelsForEach
    jewelsAmount.space = jewelsForEach

    
    const remaining = remainingJewels % 3
    jewelsAmount.power += remaining
}

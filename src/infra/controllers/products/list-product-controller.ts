import { Request, Response, } from "express";
import { ListProductsUseCase } from "../../../applications/usecases/produtct/list-products-use-case";

export class ListProductController { 

    constructor(private usecase: ListProductsUseCase) {}

    async handler (req: Request, res: Response){       
              
        try {
            const result = await this.usecase.execute()
            return res.json({products: result})
        } catch (error) {
            return res.status(400).json({message: error.message})
       
    }
}
}
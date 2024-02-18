import { Request, Response, } from "express";
import { FindByIdUseCase } from "../../../applications/usecases/produtct/find-product-id-use-case";

export class FindProductIdController { 

    constructor(private usecase: FindByIdUseCase) {}

    async handler (req: Request, res: Response){       
              const  id  = req.params.productId 
              
        try {
            const result = await this.usecase.execute(id)
            return res.json(result)
        } catch (error) {
            return res.status(400).json({message: error.message})
       
    }
}
}
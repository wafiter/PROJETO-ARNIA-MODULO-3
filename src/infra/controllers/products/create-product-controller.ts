import { CreateProductUseCase } from "../../../applications/usecases/produtct/create-product-use-case";
import { Request, Response } from "express";
import { createProductBodyValidation } from "../../validations/create-product-body-validation";

export class CreateProductController { 
    constructor (private usecase: CreateProductUseCase) {}

    async handler(req: Request ,res: Response) {
        const { body } = req
        console.log(req.id)
        const bodyIsValid = await createProductBodyValidation(body)

        if (!bodyIsValid.isValid) {
            return res.status(400).json({ message: bodyIsValid.message });
          }      
          try {
            const data = {
              ...body,
              adminId: req.id
            }
            const result = await this.usecase.execute(data);
            return res.status(201).json({message: "product create"});
          } catch (error: any) {
            return res.status(400).json({ message: error.message });
          }
        
    
    }
}
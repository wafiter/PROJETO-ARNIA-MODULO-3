import { EditProductUseCase } from "../../../applications/usecases/produtct/edit-product-use-case"; 
import { Request, Response } from "express";
import { editProductBodyValidation } from "../../validations/edit-product-body-validations";

export class EditProductController { 
    constructor (private usecase: EditProductUseCase) {}

    async handler(req: Request ,res: Response) {
        const adminId = req.params.id

        const body = { ...req.body, photo: req.file?.filename }
        
        const bodyIsValid = await editProductBodyValidation(body)

        if (!bodyIsValid.isValid) {
            return res.status(400).json({ message: bodyIsValid.message });
          }      
          try {           
            await this.usecase.execute(body, adminId);            
            return res.status(201).json({message: "product Editado"});
          } catch (error: any) {
            return res.status(400).json({ message: error.message });
          }
        
    
    }
}
import { SendJewUserUseCase } from "../../../applications/usecases/user/send-jew-user-use-case";
import { sendJewBodyValidation } from "../../validations/send-jew-body-validation";
import { Request, Response } from "express"; 

export class SendJewUserController { 
    constructor (private usecase: SendJewUserUseCase) {}

    async handler(req: Request ,res: Response) {

        const { body } = req
        const  admin  = req.params.id

        const bodyIsValid = await sendJewBodyValidation(body)

       

        if (!bodyIsValid.isValid) {
            return res.status(400).json({ message: bodyIsValid.message });
          }      
          try {
            const result = await this.usecase.execute(body, admin);
            return res.status(201).json({message: "jewelry sent"});
          } catch (error: any) {
            return res.status(400).json({ message: error.message });
          }
        
    
    }
}
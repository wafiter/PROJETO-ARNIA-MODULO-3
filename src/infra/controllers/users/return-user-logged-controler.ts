import { Response, Request } from "express";
import { LoggedUserUseCase } from "../../../applications/usecases/user/return-user-logged-use-case";

export class LoggedUserController { 
    constructor(private usecase: LoggedUserUseCase) {}

    async handler (req: Request, res: Response) {       
        const id = req.params.id
        try {
          const result = await this.usecase.execute(id)
          return res.status(201).json({identifiedUser: result}); 
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }

    }
}
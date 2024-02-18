import { CreateUserUseCase } from "../../../applications/usecases/user/create-user-use-case";
import { createUserBodyValidation } from "../../validations/create-user-body-validation";
import { Request, Response } from "express";

export class CreateUserController {

  constructor(private usecase: CreateUserUseCase) {}

  async handler(req: Request, res: Response) {
    
    const body = { ...req.body, photo: req.file?.filename };
    

    const bodyIsValid = await createUserBodyValidation(body);

    if (!bodyIsValid.isValid) {
      return res.status(400).json({ message: bodyIsValid.message });
    }

    try {
      await this.usecase.execute(body);
      return res.status(201).json({mensage: "create"});
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

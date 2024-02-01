import { LoginAdminUseCase } from "../../../applications/usecases/login/loguin-admin-use-case";
import { Request, Response } from "express";
import { loginBodyValidation } from "../../validations/login-body-validation";

export class LoginAdminController {
  constructor(private usecase: LoginAdminUseCase) {}

  async handler(req: Request, res: Response) {
    const { body } = req;

    const bodyIsValid = await loginBodyValidation(body);

    if (!bodyIsValid.isValid) {
      return res.status(400).json({ message: bodyIsValid.message });
    }

    try {
      const usecase = await this.usecase.execute(body);
      return res.json({ data: usecase });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

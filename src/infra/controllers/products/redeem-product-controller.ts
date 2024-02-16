import { Request, Response } from "express";
import { RedeemProductUseCase } from "../../../applications/usecases/produtct/redeem-product-use-case";
import { redeemProductBodyValidation } from "../../validations/reedem-product-body-validation";

export class RedeemProductController {
  constructor(private usecase: RedeemProductUseCase) {}

  async handler(req: Request, res: Response) {
    const body = req.body;

    const bodyIsValid = await redeemProductBodyValidation(body);
    if (!bodyIsValid.isValid) {
      return res.status(400).json({ message: bodyIsValid.message });
    }

    const id = req.params.id;
    const { productId, price } = body;

    try {
      const result = await this.usecase.execute(id, productId, price);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

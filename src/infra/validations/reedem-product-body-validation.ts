import * as yup from "yup"

export async function redeemProductBodyValidation (body: any) {
    const bodyType = yup.object({
    productId: yup.string().required(),
    price: yup.number().required(),
   
  });
  try {
    await bodyType.validate(body);
    return { isValid: true, message:""}
  } catch (error: any) {
    return { isValid: false, message: error.errors}
  }
}


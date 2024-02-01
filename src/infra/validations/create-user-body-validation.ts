import * as yup from "yup"

export async function createUserBodyValidation (body: any) {
    const bodyType = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  try {
    await bodyType.validate(body);
    return { isValid: true, message:""}
  } catch (error: any) {
    return { isValid: false, message: error.errors}
  }
}
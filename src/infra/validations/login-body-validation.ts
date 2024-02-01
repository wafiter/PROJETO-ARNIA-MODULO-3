import * as yup from "yup"

export async function loginBodyValidation (body: any) { 
    const bodyType = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
      });
      try {
        await bodyType.validate(body);
        return { isValid: true}
      } catch (error: any) {
        return { isValid: false, message: error.errors}
      }
}
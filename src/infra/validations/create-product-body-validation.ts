import * as yup from "yup"

export async function createProductBodyValidation (body: any) {
    const bodyType = yup.object({
        name:yup.string().required(),
        value: yup.string().required(),
        amount: yup.string().required(),
        description: yup.string().required(),
        photo: yup.string(),
  });
  try {
    await bodyType.validate(body);
    return { isValid: true, message:""}
  } catch (error: any) {
    return { isValid: false, message: error.errors}
  }
}


    
import * as yup from "yup"

export async function sendJewBodyValidation (body: any) {

    const bodyType = yup.object({

        id: yup.string().required(),        
        amount: yup.number().required(),
        type: yup.string().required().oneOf(["mind", "power", "space"]).trim()
       
  })
  
  try {
    await bodyType.validate(body);
    return { isValid: true, message:""}
  } catch (error: any) {
    return { isValid: false, message: error.errors}
  }
}


import { TokenJwt } from "../../applications/token/token-jwt";
import  Jwt  from "jsonwebtoken";



export class JwtToken implements TokenJwt {
    generate (payload: any) {
        const secretKey = process.env.SECRET_KEY as string
        
        const options = {expiresIn: "200min"}
        return Jwt.sign(payload, secretKey, options)
    }
}




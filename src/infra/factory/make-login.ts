import { LoginUseCase } from "../../applications/usecases/login/login-use-case";
import { LoginController } from "../controllers/auth/login-controller";
import { HashBcrypt } from "../cryptography/hasher-bcrypt";
import { JwtToken } from "../jwt/jwt-token";
import { UserRepositoryMogo } from "../repositories/user-repository-mogo";


export class MakeLogin {
  static make() {
    const jwt = new JwtToken();
    const hasher = new HashBcrypt();
    const userRepository = new UserRepositoryMogo();
    const loginUseCase = new LoginUseCase(userRepository, hasher, jwt);
    const loginController = new LoginController(loginUseCase)
    return loginController;
  }
}

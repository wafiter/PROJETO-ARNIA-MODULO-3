import { LoginAdminUseCase } from "../../applications/usecases/login/loguin-admin-use-case";
import { LoginAdminController } from "../controllers/auth/login-admin-controller";
import { HashBcrypt } from "../cryptography/hasher-bcrypt";
import { JwtToken } from "../jwt/jwt-token";
import { AdminRepositoryMongo } from "../repositories/admin-repository-mongo";


export class MakeAdminLogin {
  static make() {
    const jwt = new JwtToken();
    const hasher = new HashBcrypt();
    const adminRepository = new AdminRepositoryMongo();
    const loginAdminUseCase = new LoginAdminUseCase(adminRepository, hasher, jwt)
    const loginAdminController = new LoginAdminController(loginAdminUseCase)
    return loginAdminController;
  }
}

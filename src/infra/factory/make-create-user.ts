import { CreateUserUseCase } from "../../applications/usecases/user/create-user-use-case";
import { CreateUserController } from "../controllers/users/create-user-controller";
import { HashBcrypt } from "../cryptography/hasher-bcrypt";
import { UserRepositoryMogo } from "../repositories/user-repository-mogo";

 export class MakeCreateUser { 
    static make () {
        const hasher = new HashBcrypt();
        const userRepository = new UserRepositoryMogo();
        const createUserUseCase = new CreateUserUseCase(userRepository, hasher);
        const createUserControler = new CreateUserController(createUserUseCase)
        return createUserControler
    }
}
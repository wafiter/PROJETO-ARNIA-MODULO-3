import { LoggedUserUseCase } from "../../applications/usecases/user/return-user-logged-use-case";
import { LoggedUserController } from "../controllers/users/return-user-logged-controler";
import { AdminRepositoryMongo } from "../repositories/admin-repository-mongo";
import { UserRepositoryMogo } from "../repositories/user-repository-mogo";

export class MakeUserLogged {
    static make() {
      const userRepository = new UserRepositoryMogo ()
      const admRepository = new AdminRepositoryMongo();      
      const usecase = new LoggedUserUseCase (userRepository, admRepository)
      const controller = new LoggedUserController (usecase);
      return controller;
    }
  }
  
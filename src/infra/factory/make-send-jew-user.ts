import { SendJewUserUseCase } from "../../applications/usecases/user/send-jew-user-use-case";
import { SendJewUserController } from "../controllers/users/send-jew-user-controller";
import { AdminRepositoryMongo } from "../repositories/admin-repository-mongo";
import { UserRepositoryMogo } from "../repositories/user-repository-mogo";


export class MakeSendJewUser {
  static make() {
    const userRepository = new UserRepositoryMogo ();
    const admRepository = new AdminRepositoryMongo ()
    const usecase = new SendJewUserUseCase (userRepository, admRepository);
    const controller = new SendJewUserController (usecase);
    return controller;
  }
}

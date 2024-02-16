import { RepUser } from "../../../entities/user";
import { AdminRepository } from "../../repositories/admin-repository";
import { UserRepository } from "../../repositories/user-repository";

export class LoggedUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private AdmRepository: AdminRepository
  ) {}

  async execute(id: string) {
    try {
      const loggedUser: RepUser | null = await this.userRepository.findById(id);
      if(!loggedUser) {
        const loggedUser = await this.AdmRepository.findByID(id)
         return loggedUser
                
       }
      return loggedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

 

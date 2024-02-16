import { UserRepository } from "../../repositories/user-repository";
import { AdminRepository } from "../../repositories/admin-repository";

interface Body {
  id: string;
  type: string;
  amount: number;
}

export class SendJewUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private adminRepository: AdminRepository
  ) {}

  async execute(body: Body, admin: string) {
    const id = body.id;
    const typejew = body.type;
    const amount = body.amount;

    try {
      const adm = await this.adminRepository.findByID(admin);
      if (!adm) {
        throw new Error("unauthorized");
      }

      const userExiste = await this.userRepository.findById(id);

      if (!userExiste) {
        throw new Error("User Not Found");
      }

      await this.userRepository.updateUserjews(userExiste.id, typejew, amount);

      return userExiste;
    } catch (error) {
      throw new Error(error);
    }
  }
}

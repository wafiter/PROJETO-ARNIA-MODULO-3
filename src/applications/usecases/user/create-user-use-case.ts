import { Hasher } from "../../cryptography/hasher";
import { UserData, UserRepository } from "../../repositories/user-repository";

export class CreateUserUseCase {

  constructor(private userRepository: UserRepository, private hasher: Hasher) {}

  async execute(userData: UserData) {
    const userExiste = await this.userRepository.findByEmail(userData.email);

    if (userExiste) {
      throw new Error("There is already a registered user with this email");
    }

    const data = {
      ...userData,
      password: await this.hasher.encrypt(userData.password),
    };
    const result = await this.userRepository.create(data);
    return result;
  }
}

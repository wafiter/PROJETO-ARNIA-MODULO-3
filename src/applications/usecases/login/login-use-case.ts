import { Hasher } from "../../cryptography/hasher";
import { UserRepository } from "../../repositories/user-repository";
import { TokenJwt } from "../../token/token-jwt";

interface Input {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
    private token: TokenJwt
  ) {}

  async execute(input: Input) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("user not found or password invalid");
    }
    const passwordIsValid = await this.hasher.compare(input.password, user.password);
    if (!passwordIsValid) {
      throw new Error("user not found or password invalid");
    }

    const token = this.token.generate({ id: user.id, email: user.email });
    return token;
  }
}

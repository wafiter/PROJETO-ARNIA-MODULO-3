import { Hasher } from "../../cryptography/hasher";
import { AdminRepository } from "../../repositories/admin-repository";
import { TokenJwt } from "../../token/token-jwt";

interface Input {
  email: string;
  password: string;
}

export class LoginAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hasher: Hasher,
    private token: TokenJwt
  ) {}

  async execute(input: Input) {
    const admin = await this.adminRepository.findByEmail(input.email);
    if (!admin) {
      throw new Error("user not found or password invalid");
    }
    const passwordIsValid = await this.hasher.compare(input.password, admin.password);
    if (!passwordIsValid) {
      throw new Error("user not found or password invalid");
    }

    const token = this.token.generate({ id: admin.id, email: admin.email });
    return token;
  }
}

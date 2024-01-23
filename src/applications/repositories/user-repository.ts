import { RepUser } from "../../domain/user";

export interface UserRepository {
    findByEmail(email: string): Promise<RepUser>
}
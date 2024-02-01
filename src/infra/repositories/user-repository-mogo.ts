import { UserData, UserRepository } from "../../applications/repositories/user-repository";
import { RepUser, UserModel } from "../../entities/user";

export class UserRepositoryMogo implements UserRepository {

    async create(userData: UserData): Promise<void> {
        await UserModel.create(userData)
    }
    async findByEmail(email: string): Promise<RepUser | null> {
        return UserModel.findOne({ email })
    }
    
}
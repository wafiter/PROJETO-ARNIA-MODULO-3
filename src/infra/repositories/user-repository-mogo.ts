import { ObjectId } from "mongoose";
import {
  UserData,
  UserRepository,
} from "../../applications/repositories/user-repository";
import { RepUser, UserModel } from "../../entities/user";

export class UserRepositoryMogo implements UserRepository {
  async updateUserjews(
    id: ObjectId,
    typejew: string,
    amount: number
  ): Promise<RepUser | null> {
    try {
      const result = await UserModel.findByIdAndUpdate(
        id,
        { $inc: { [`jewelsAmount.${typejew}`]: amount } },
        {
          new: true,
        }
      );

      if (!result) {
        throw new Error("user not found");
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id: ObjectId, userExiste: RepUser): Promise<RepUser | null> {
    const updateUser = await UserModel.findByIdAndUpdate(
      { _id: id },
      userExiste,
      { new: true }
    );

    return (updateUser as RepUser) || null;
  }

  async findById(id: string): Promise<RepUser | null> {
    return await UserModel.findById(id);
  }

  async create(userData: UserData): Promise<void> {
    await UserModel.create(userData);
  }

  async findByEmail(email: string): Promise<RepUser | null> {
    return UserModel.findOne({ email });
  }
}

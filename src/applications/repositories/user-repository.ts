import { ObjectId } from "mongoose";
import { RepUser } from "../../entities/user";

export interface UserData {
    name: string
    email: string
    password: string
    photo: string    
}

export interface UserRepository {
    
    updateUserjews(id: ObjectId, typejew: string, amount: number): Promise<RepUser | null>
   
    updateUser(id: ObjectId, userExiste: RepUser): Promise<RepUser | null>
    create(userData: UserData): Promise<void>
    findByEmail(email: string): Promise<RepUser | null>
    findById(id: string): Promise<RepUser | null>
}
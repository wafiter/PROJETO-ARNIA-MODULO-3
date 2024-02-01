import { RepUser } from "../../entities/user";

export interface UserData {
    name: string
    email: string
    password: string
    photo: string    
}

export interface UserRepository {
    create(userData: UserData): Promise<void>
    findByEmail(email: string): Promise<RepUser | null>    
}
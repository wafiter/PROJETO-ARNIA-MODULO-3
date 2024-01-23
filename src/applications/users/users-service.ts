import { RepUser } from "../../domain/user"
import { UserRepository } from "../repositories/user-repository"

interface UserData {
    name: string
    email: string
    password: string    
}



class UsersService { 

    constructor(private userRepository: UserRepository){
        
    }

    async creat(userData: UserData){ 
        





    }
}
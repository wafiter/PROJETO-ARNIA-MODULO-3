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
        
        const userExiste = await this.userRepository.findByEmail(userData.email)

        if(userExiste){ 
            throw new Error ("There is already a registered user with this email") 
        }






    }
}
interface UserData {
    name: string
    email: string
    password: string    
}

interface UserRepository {
    findByEmail(email: string): Promise<User>
}

class UsersService { 

    constructor(private userRepository: UserRepository )

    async creat(userData: UserData){ 




    }
}
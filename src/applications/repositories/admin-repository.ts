import { RepAdmin } from "../../entities/admin"


export interface AdminData {
    name: string
    email: string
    password: string    
}

export interface AdminRepository {
    
    create(adminData: AdminData): Promise<RepAdmin>

    findByID(id: string): Promise<RepAdmin | null>   
    
    findByEmail(email: string): Promise<RepAdmin | null>        
}
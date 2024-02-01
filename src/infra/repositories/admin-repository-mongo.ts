import { AdminData, AdminRepository } from "../../applications/repositories/admin-repository";
import { AdminModel, RepAdmin } from "../../entities/admin";

export class AdminRepositoryMongo implements AdminRepository {

    
    async create(adminData: AdminData): Promise<RepAdmin> {
        return AdminModel.create(adminData)
    }
    async findByID(id: string): Promise<RepAdmin | null> {
        return AdminModel.findById(id)

    }
    async findByEmail(email: string): Promise<RepAdmin | null> {
        return AdminModel.findOne({ email })
    }

    
}
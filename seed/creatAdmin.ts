import { AdminModel } from "../src/entities/admin"
import { HashBcrypt } from "../src/infra/cryptography/hasher-bcrypt"
import { Database } from "../src/infra/database/database"
import "dotenv/config"

async function run () {
    await Database.connect()
    const hasher = new HashBcrypt()
    await AdminModel.create({
        name: "Admin",
        email: "wafiter@gmail.com",
        password: await hasher.encrypt(process.env.ADMKEY as string)

    })
    
}

run()
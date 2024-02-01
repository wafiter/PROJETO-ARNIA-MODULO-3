import express from "express";
import { CreateUserUseCase } from "../../applications/usecases/user/create-user-use-case";
import { UserRepositoryMogo } from "../repositories/user-repository-mogo";
import { HashBcrypt } from "../cryptography/hasher-bcrypt";
import { LoginUseCase } from "../../applications/usecases/login/login-use-case";
import { JwtToken } from "../jwt/jwt-token";
import { createUserBodyValidation } from "../validations/create-user-body-validation";
import { loginBodyValidation } from "../validations/login-body-validation";
import { MakeCreateUser } from "../factory/make-create-user";
import { MakeLogin } from "../factory/make-login";
import { MakeCreateProduct } from "../factory/make-create-product";
import { MakeProductList } from "../factory/make-list-products";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { MakeAdminLogin } from "../factory/make-login-admin";

const app = express();

app.use(express.json());

const createUser = MakeCreateUser.make()
const login = MakeLogin.make()
const createProduct = MakeCreateProduct.make()
const listProducts = MakeProductList.make()
const loginAdmin = MakeAdminLogin.make()

app.post("/users", createUser.handler.bind(createUser));

app.post("/login", login.handler.bind(login));

app.post("/login/admin", loginAdmin.handler.bind(loginAdmin))

app.post("/products", AuthMiddleware.handler.bind(AuthMiddleware),  createProduct.handler.bind(createProduct))

app.get("/product-list", AuthMiddleware.handler.bind(AuthMiddleware),  listProducts.handler.bind(listProducts)   )

export { app };

 
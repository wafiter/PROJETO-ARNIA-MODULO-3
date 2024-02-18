import express from "express";
import { MakeCreateUser } from "../factory/make-create-user";
import { MakeLogin } from "../factory/make-login";
import { MakeCreateProduct } from "../factory/make-create-product";
import { MakeProductList } from "../factory/make-list-products";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { MakeAdminLogin } from "../factory/make-login-admin";
import { MakeFindProductId } from "../factory/make-find-product-id";
import { MakeSendJewUser } from "../factory/make-send-jew-user";
import { MakeRedeemProduct } from "../factory/make-redeem-product";
import { MakeUserLogged } from "../factory/make-user-logged";
import { MakeEditProduct } from "../factory/make-edit-product";
import { storageMiddleware } from "../middlewares/upload-middleware";

const app = express();

app.use(express.json())
app.use(express.static("www"))

const createUser = MakeCreateUser.make()
const login = MakeLogin.make()
const createProduct = MakeCreateProduct.make()
const listProducts = MakeProductList.make()
const loginAdmin = MakeAdminLogin.make()
const findProductId = MakeFindProductId.make()
const sendJew = MakeSendJewUser.make()
const reedem = MakeRedeemProduct.make()
const loggedUser = MakeUserLogged.make()
const editProduct= MakeEditProduct.make()

app.post("/users", storageMiddleware.single("photo") ,createUser.handler.bind(createUser));

app.post("/send-jew",AuthMiddleware.handler.bind(AuthMiddleware), sendJew.handler.bind(sendJew))

app.post("/login", login.handler.bind(login));

app.post("/login/admin", loginAdmin.handler.bind(loginAdmin))

app.post("/products", AuthMiddleware.handler.bind(AuthMiddleware), storageMiddleware.single("photo"), createProduct.handler.bind(createProduct))

app.post("/edit-product", AuthMiddleware.handler.bind(AuthMiddleware), storageMiddleware.single("photo"), editProduct.handler.bind(editProduct))

app.post("/reedem", AuthMiddleware.handler.bind(AuthMiddleware), reedem.handler.bind(reedem))

app.get("/product-list", AuthMiddleware.handler.bind(AuthMiddleware),  listProducts.handler.bind(listProducts)   )

app.get("/product/:productId", AuthMiddleware.handler.bind(AuthMiddleware), findProductId.handler.bind(findProductId) )

app.get("/me", AuthMiddleware.handler.bind(AuthMiddleware), loggedUser.handler.bind(loggedUser)  )



export { app };

 
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/infra/http (rotas)/server.ts
var server_exports = {};
__export(server_exports, {
  app: () => app
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"));

// src/applications/usecases/user/create-user-use-case.ts
var CreateUserUseCase = class {
  constructor(userRepository, hasher) {
    this.userRepository = userRepository;
    this.hasher = hasher;
  }
  execute(userData) {
    return __async(this, null, function* () {
      const userExiste = yield this.userRepository.findByEmail(userData.email);
      if (userExiste) {
        throw new Error("There is already a registered user with this email");
      }
      const data = __spreadProps(__spreadValues({}, userData), {
        password: yield this.hasher.encrypt(userData.password)
      });
      const result = yield this.userRepository.create(data);
      return result;
    });
  }
};

// src/infra/validations/create-user-body-validation.ts
var yup = __toESM(require("yup"));
function createUserBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    });
    try {
      yield bodyType.validate(body);
      return { isValid: true, message: "" };
    } catch (error) {
      return { isValid: false, message: error.errors };
    }
  });
}

// src/infra/controllers/users/create-user-controller.ts
var CreateUserController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const bodyIsValid = yield createUserBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      try {
        yield this.usecase.execute(body);
        return res.status(201).json({ mensage: "create" });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/cryptography/hasher-bcrypt.ts
var import_bcrypt = __toESM(require("bcrypt"));
var HashBcrypt = class {
  compare(value, hashed) {
    return import_bcrypt.default.compare(value, hashed);
  }
  encrypt(value) {
    return __async(this, null, function* () {
      return import_bcrypt.default.hash(value, 8);
    });
  }
};

// src/entities/user.ts
var import_mongoose = require("mongoose");
var UserSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jewelsAmount: {
      power: { type: Number, default: 0 },
      mind: { type: Number, default: 0 },
      space: { type: Number, default: 0 }
    },
    products: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Product" }],
    favoriteProducts: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Product" }],
    photo: { type: String }
  },
  { timestamps: true }
);
var UserModel = (0, import_mongoose.model)("users", UserSchema);

// src/infra/repositories/user-repository-mogo.ts
var UserRepositoryMogo = class {
  updateUserjews(id, typejew, amount) {
    return __async(this, null, function* () {
      try {
        const result = yield UserModel.findByIdAndUpdate(
          id,
          { $inc: { [`jewelsAmount.${typejew}`]: amount } },
          {
            new: true
          }
        );
        if (!result) {
          throw new Error("user not found");
        }
        return result;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
  updateUser(id, userExiste) {
    return __async(this, null, function* () {
      const updateUser = yield UserModel.findByIdAndUpdate(
        { _id: id },
        userExiste,
        { new: true }
      );
      return updateUser || null;
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      return yield UserModel.findById(id);
    });
  }
  create(userData) {
    return __async(this, null, function* () {
      yield UserModel.create(userData);
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      return UserModel.findOne({ email });
    });
  }
};

// src/infra/factory/make-create-user.ts
var MakeCreateUser = class {
  static make() {
    const hasher = new HashBcrypt();
    const userRepository = new UserRepositoryMogo();
    const createUserUseCase = new CreateUserUseCase(userRepository, hasher);
    const createUserControler = new CreateUserController(createUserUseCase);
    return createUserControler;
  }
};

// src/applications/usecases/login/login-use-case.ts
var LoginUseCase = class {
  constructor(userRepository, hasher, token) {
    this.userRepository = userRepository;
    this.hasher = hasher;
    this.token = token;
  }
  execute(input) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.findByEmail(input.email);
      if (!user) {
        throw new Error("user not found or password invalid");
      }
      const passwordIsValid = yield this.hasher.compare(input.password, user.password);
      if (!passwordIsValid) {
        throw new Error("user not found or password invalid");
      }
      const token = this.token.generate({ id: user.id, email: user.email });
      return token;
    });
  }
};

// src/infra/validations/login-body-validation.ts
var yup2 = __toESM(require("yup"));
function loginBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup2.object({
      email: yup2.string().email().required(),
      password: yup2.string().required()
    });
    try {
      yield bodyType.validate(body);
      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: error.errors };
    }
  });
}

// src/infra/controllers/auth/login-controller.ts
var LoginController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const bodyIsValid = yield loginBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      try {
        const usecase = yield this.usecase.execute(body);
        return res.json({ data: usecase });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/jwt/jwt-token.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JwtToken = class {
  generate(payload) {
    const secretKey = process.env.SECRET_KEY;
    const options = { expiresIn: "200min" };
    return import_jsonwebtoken.default.sign(payload, secretKey, options);
  }
};

// src/infra/factory/make-login.ts
var MakeLogin = class {
  static make() {
    const jwt2 = new JwtToken();
    const hasher = new HashBcrypt();
    const userRepository = new UserRepositoryMogo();
    const loginUseCase = new LoginUseCase(userRepository, hasher, jwt2);
    const loginController = new LoginController(loginUseCase);
    return loginController;
  }
};

// src/applications/usecases/produtct/create-product-use-case.ts
var CreateProductUseCase = class {
  constructor(productRepository, admRepository) {
    this.productRepository = productRepository;
    this.admRepository = admRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({ id, name, value, amount, description, photo }) {
      const adm = yield this.admRepository.findByID(id);
      if (!adm) {
        throw new Error("This user is not an admin");
      }
      const productData = { name, value, amount, description, photo };
      const result = yield this.productRepository.create(productData);
      return result;
    });
  }
};

// src/infra/validations/create-product-body-validation.ts
var yup3 = __toESM(require("yup"));
function createProductBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup3.object({
      name: yup3.string().required(),
      value: yup3.string().required(),
      amount: yup3.string().required(),
      description: yup3.string().required(),
      photo: yup3.string()
    });
    try {
      yield bodyType.validate(body);
      return { isValid: true, message: "" };
    } catch (error) {
      return { isValid: false, message: error.errors };
    }
  });
}

// src/infra/controllers/products/create-product-controller.ts
var CreateProductController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const bodyIsValid = yield createProductBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      try {
        const data = __spreadProps(__spreadValues({}, body), {
          id: req.params.id
        });
        yield this.usecase.execute(data);
        return res.status(201).json({ message: "product create" });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/entities/admin.ts
var import_mongoose2 = require("mongoose");
var AdminSchema = new import_mongoose2.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);
var AdminModel = (0, import_mongoose2.model)("admins", AdminSchema);

// src/infra/repositories/admin-repository-mongo.ts
var AdminRepositoryMongo = class {
  create(adminData) {
    return __async(this, null, function* () {
      return AdminModel.create(adminData);
    });
  }
  findByID(id) {
    return __async(this, null, function* () {
      return AdminModel.findById(id);
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      return AdminModel.findOne({ email });
    });
  }
};

// src/entities/product.ts
var import_mongoose3 = require("mongoose");
var ProductSchema = new import_mongoose3.Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String }
  },
  { timestamps: true }
);
var ProductModel = (0, import_mongoose3.model)("products", ProductSchema);

// src/infra/repositories/product-repository-mongo.ts
var ProductRepositoryMogo = class {
  create(productData) {
    return __async(this, null, function* () {
      try {
        yield ProductModel.create(productData);
      } catch (error) {
        throw new Error("Unable to create product in database");
      }
    });
  }
  findAll() {
    return __async(this, null, function* () {
      return yield ProductModel.find({ amount: { $gt: 0 } });
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      try {
        const product = yield ProductModel.findById(id);
        return product;
      } catch (error) {
        throw new Error("ID NOT FOUND IN THE DATABASE");
      }
    });
  }
  updateProduct(id, product) {
    return __async(this, null, function* () {
      try {
        const updateProduct = yield ProductModel.findByIdAndUpdate(id, product);
        return updateProduct == null ? void 0 : updateProduct.updatedAt;
      } catch (error) {
        throw new Error("id or product, not found in the database");
      }
    });
  }
};

// src/infra/factory/make-create-product.ts
var MakeCreateProduct = class {
  static make() {
    const admRepository = new AdminRepositoryMongo();
    const productRepository = new ProductRepositoryMogo();
    const createProductUseCase = new CreateProductUseCase(productRepository, admRepository);
    const createProductController = new CreateProductController(createProductUseCase);
    return createProductController;
  }
};

// src/applications/usecases/produtct/list-products-use-case.ts
var ListProductsUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  execute() {
    return __async(this, null, function* () {
      const allProducts = yield this.productRepository.findAll();
      return allProducts;
    });
  }
};

// src/infra/controllers/products/list-product-controller.ts
var ListProductController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      try {
        const result = yield this.usecase.execute();
        return res.json({ products: result });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/factory/make-list-products.ts
var MakeProductList = class {
  static make() {
    const repository = new ProductRepositoryMogo();
    const usecase = new ListProductsUseCase(repository);
    const controller = new ListProductController(usecase);
    return controller;
  }
};

// src/infra/middlewares/auth-middleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_config = require("dotenv/config");
var AuthMiddleware = class {
  static handler(req, res, next) {
    const { headers } = req;
    if (!headers.authorization) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const token = headers == null ? void 0 : headers.authorization.replace("Bearer ", "");
    try {
      import_jsonwebtoken2.default.verify(token, process.env.SECRET_KEY);
      const payload = import_jsonwebtoken2.default.decode(token);
      if (!payload) {
        throw new Error("user not found");
      }
      req.params.id = payload.id;
    } catch (error) {
      return res.status(401).json({ message: "invalid token" });
    }
    next();
  }
};

// src/applications/usecases/login/loguin-admin-use-case.ts
var LoginAdminUseCase = class {
  constructor(adminRepository, hasher, token) {
    this.adminRepository = adminRepository;
    this.hasher = hasher;
    this.token = token;
  }
  execute(input) {
    return __async(this, null, function* () {
      const admin = yield this.adminRepository.findByEmail(input.email);
      if (!admin) {
        throw new Error("user not found or password invalid");
      }
      const passwordIsValid = yield this.hasher.compare(input.password, admin.password);
      if (!passwordIsValid) {
        throw new Error("user not found or password invalid");
      }
      const token = this.token.generate({ id: admin.id, email: admin.email });
      return token;
    });
  }
};

// src/infra/controllers/auth/login-admin-controller.ts
var LoginAdminController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const bodyIsValid = yield loginBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      try {
        const usecase = yield this.usecase.execute(body);
        return res.json({ data: usecase });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/factory/make-login-admin.ts
var MakeAdminLogin = class {
  static make() {
    const jwt2 = new JwtToken();
    const hasher = new HashBcrypt();
    const adminRepository = new AdminRepositoryMongo();
    const loginAdminUseCase = new LoginAdminUseCase(adminRepository, hasher, jwt2);
    const loginAdminController = new LoginAdminController(loginAdminUseCase);
    return loginAdminController;
  }
};

// src/applications/usecases/produtct/find-product-id-use-case.ts
var FindByIdUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  execute(id) {
    return __async(this, null, function* () {
      const product = yield this.productRepository.findById(id);
      return product;
    });
  }
};

// src/infra/controllers/products/find-product-id-controller.ts
var FindProductIdController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const id = req.params.productId;
      try {
        const result = yield this.usecase.execute(id);
        return res.json(result);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/factory/make-find-product-id.ts
var MakeFindProductId = class {
  static make() {
    const repository = new ProductRepositoryMogo();
    const usecase = new FindByIdUseCase(repository);
    const controller = new FindProductIdController(usecase);
    return controller;
  }
};

// src/applications/usecases/user/send-jew-user-use-case.ts
var SendJewUserUseCase = class {
  constructor(userRepository, adminRepository) {
    this.userRepository = userRepository;
    this.adminRepository = adminRepository;
  }
  execute(body, admin) {
    return __async(this, null, function* () {
      const id = body.id;
      const typejew = body.type;
      const amount = body.amount;
      try {
        const adm = yield this.adminRepository.findByID(admin);
        if (!adm) {
          throw new Error("unauthorized");
        }
        const userExiste = yield this.userRepository.findById(id);
        if (!userExiste) {
          throw new Error("User Not Found");
        }
        yield this.userRepository.updateUserjews(userExiste.id, typejew, amount);
        return userExiste;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/infra/validations/send-jew-body-validation.ts
var yup4 = __toESM(require("yup"));
function sendJewBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup4.object({
      id: yup4.string().required(),
      amount: yup4.number().required(),
      type: yup4.string().required().oneOf(["mind", "power", "space"]).trim()
    });
    try {
      yield bodyType.validate(body);
      return { isValid: true, message: "" };
    } catch (error) {
      return { isValid: false, message: error.errors };
    }
  });
}

// src/infra/controllers/users/send-jew-user-controller.ts
var SendJewUserController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const admin = req.params.id;
      const bodyIsValid = yield sendJewBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      try {
        const result = yield this.usecase.execute(body, admin);
        return res.status(201).json({ message: "jewelry sent" });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/factory/make-send-jew-user.ts
var MakeSendJewUser = class {
  static make() {
    const userRepository = new UserRepositoryMogo();
    const admRepository = new AdminRepositoryMongo();
    const usecase = new SendJewUserUseCase(userRepository, admRepository);
    const controller = new SendJewUserController(usecase);
    return controller;
  }
};

// src/applications/usecases/produtct/redeem-product-use-case.ts
var RedeemProductUseCase = class {
  constructor(productRepository, userRepository) {
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }
  execute(userId, productId, price) {
    return __async(this, null, function* () {
      console.log(productId, userId, price);
      const userExist = yield this.userRepository.findById(userId);
      const productExist = yield this.productRepository.findById(productId);
      console.log(userExist, productExist, productExist == null ? void 0 : productExist.amount);
      if (userExist && productExist && productExist.amount > 0) {
        if (enoughJewels(userExist.jewelsAmount, price)) {
          deductJewels(userExist.jewelsAmount, price);
          userExist.products.push(productExist._id);
          productExist.amount -= 1;
          yield this.productRepository.updateProduct(productExist._id, productExist);
          yield this.userRepository.updateUser(userExist._id, userExist);
          return "Successfully, the product has been added to your pack";
        } else {
          throw new Error("User does not have enough gems to redeem this product");
        }
      } else {
        throw new Error("Product not found or product out of stock");
      }
    });
  }
};
function enoughJewels(jewelsAmount, price) {
  const totalJewels = jewelsAmount.power + jewelsAmount.mind + jewelsAmount.space;
  return totalJewels >= price;
}
function deductJewels(jewelsAmount, requiredAmount) {
  const totalJewels = jewelsAmount.power + jewelsAmount.mind + jewelsAmount.space;
  const remainingJewels = totalJewels - requiredAmount;
  const jewelsForEach = remainingJewels / 3;
  jewelsAmount.power = jewelsForEach;
  jewelsAmount.mind = jewelsForEach;
  jewelsAmount.space = jewelsForEach;
  const remaining = remainingJewels % 3;
  jewelsAmount.power += remaining;
}

// src/infra/validations/reedem-product-body-validation.ts
var yup5 = __toESM(require("yup"));
function redeemProductBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup5.object({
      productId: yup5.string().required(),
      price: yup5.number().required()
    });
    try {
      yield bodyType.validate(body);
      return { isValid: true, message: "" };
    } catch (error) {
      return { isValid: false, message: error.errors };
    }
  });
}

// src/infra/controllers/products/redeem-product-controller.ts
var RedeemProductController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const body = req.body;
      const bodyIsValid = yield redeemProductBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      const id = req.params.id;
      const { productId, price } = body;
      try {
        const result = yield this.usecase.execute(id, productId, price);
        return res.json(result);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/factory/make-redeem-product.ts
var MakeRedeemProduct = class {
  static make() {
    const productRepository = new ProductRepositoryMogo();
    const userRepository = new UserRepositoryMogo();
    const usecase = new RedeemProductUseCase(productRepository, userRepository);
    const controller = new RedeemProductController(usecase);
    return controller;
  }
};

// src/applications/usecases/user/return-user-logged-use-case.ts
var LoggedUserUseCase = class {
  constructor(userRepository, AdmRepository) {
    this.userRepository = userRepository;
    this.AdmRepository = AdmRepository;
  }
  execute(id) {
    return __async(this, null, function* () {
      try {
        const loggedUser2 = yield this.userRepository.findById(id);
        if (!loggedUser2) {
          const loggedUser3 = yield this.AdmRepository.findByID(id);
          return loggedUser3;
        }
        return loggedUser2;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/infra/controllers/users/return-user-logged-controler.ts
var LoggedUserController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const id = req.params.id;
      try {
        const result = yield this.usecase.execute(id);
        return res.status(201).json({ identifiedUser: result });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/factory/make-user-logged.ts
var MakeUserLogged = class {
  static make() {
    const userRepository = new UserRepositoryMogo();
    const admRepository = new AdminRepositoryMongo();
    const usecase = new LoggedUserUseCase(userRepository, admRepository);
    const controller = new LoggedUserController(usecase);
    return controller;
  }
};

// src/applications/usecases/produtct/edit-product-use-case.ts
var EditProductUseCase = class {
  constructor(productRepository, adminRepository) {
    this.productRepository = productRepository;
    this.adminRepository = adminRepository;
  }
  execute(product, admin) {
    return __async(this, null, function* () {
      const id = product._id;
      try {
        const adm = yield this.adminRepository.findByID(admin);
        if (!adm) {
          throw new Error("unauthorized");
        }
        const productExiste = yield this.productRepository.findById(id);
        if (!productExiste) {
          throw new Error("Product Not Found");
        }
        const result = this.productRepository.updateProduct(productExiste.id, product);
        return result;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};

// src/infra/validations/edit-product-body-validations.ts
var yup6 = __toESM(require("yup"));
function editProductBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup6.object({
      _id: yup6.string().required(),
      name: yup6.string().required(),
      value: yup6.string().required(),
      amount: yup6.string().required(),
      description: yup6.string().required(),
      photo: yup6.string()
    });
    try {
      yield bodyType.validate(body);
      return { isValid: true, message: "" };
    } catch (error) {
      return { isValid: false, message: error.errors };
    }
  });
}

// src/infra/controllers/products/edit-product-controller.ts
var EditProductController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const adminId = req.params.id;
      const { body } = req;
      const bodyIsValid = yield editProductBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      try {
        yield this.usecase.execute(body, adminId);
        return res.status(201).json({ message: "product Editado" });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/infra/factory/make-edit-product.ts
var MakeEditProduct = class {
  static make() {
    const admRepository = new AdminRepositoryMongo();
    const productRepository = new ProductRepositoryMogo();
    const editProductUseCase = new EditProductUseCase(productRepository, admRepository);
    const createProductController = new EditProductController(editProductUseCase);
    return createProductController;
  }
};

// src/infra/http (rotas)/server.ts
var app = (0, import_express.default)();
app.use(import_express.default.json());
var createUser = MakeCreateUser.make();
var login = MakeLogin.make();
var createProduct = MakeCreateProduct.make();
var listProducts = MakeProductList.make();
var loginAdmin = MakeAdminLogin.make();
var findProductId = MakeFindProductId.make();
var sendJew = MakeSendJewUser.make();
var reedem = MakeRedeemProduct.make();
var loggedUser = MakeUserLogged.make();
var editProduct = MakeEditProduct.make();
app.post("/users", createUser.handler.bind(createUser));
app.post("/send-jew", AuthMiddleware.handler.bind(AuthMiddleware), sendJew.handler.bind(sendJew));
app.post("/login", login.handler.bind(login));
app.post("/login/admin", loginAdmin.handler.bind(loginAdmin));
app.post("/products", AuthMiddleware.handler.bind(AuthMiddleware), createProduct.handler.bind(createProduct));
app.post("/edit-product", AuthMiddleware.handler.bind(AuthMiddleware), editProduct.handler.bind(editProduct));
app.post("/reedem", AuthMiddleware.handler.bind(AuthMiddleware), reedem.handler.bind(reedem));
app.get("/product-list", AuthMiddleware.handler.bind(AuthMiddleware), listProducts.handler.bind(listProducts));
app.get("/product/:productId", AuthMiddleware.handler.bind(AuthMiddleware), findProductId.handler.bind(findProductId));
app.get("/me", AuthMiddleware.handler.bind(AuthMiddleware), loggedUser.handler.bind(loggedUser));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});

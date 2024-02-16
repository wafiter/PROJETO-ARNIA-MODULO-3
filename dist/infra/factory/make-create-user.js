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

// src/infra/factory/make-create-user.ts
var make_create_user_exports = {};
__export(make_create_user_exports, {
  MakeCreateUser: () => MakeCreateUser
});
module.exports = __toCommonJS(make_create_user_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeCreateUser
});

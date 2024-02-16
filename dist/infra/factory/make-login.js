"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/infra/factory/make-login.ts
var make_login_exports = {};
__export(make_login_exports, {
  MakeLogin: () => MakeLogin
});
module.exports = __toCommonJS(make_login_exports);

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
var yup = __toESM(require("yup"));
function loginBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup.object({
      email: yup.string().email().required(),
      password: yup.string().required()
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

// src/infra/jwt/jwt-token.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JwtToken = class {
  generate(payload) {
    const secretKey = process.env.SECRET_KEY;
    const options = { expiresIn: "200min" };
    return import_jsonwebtoken.default.sign(payload, secretKey, options);
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

// src/infra/factory/make-login.ts
var MakeLogin = class {
  static make() {
    const jwt = new JwtToken();
    const hasher = new HashBcrypt();
    const userRepository = new UserRepositoryMogo();
    const loginUseCase = new LoginUseCase(userRepository, hasher, jwt);
    const loginController = new LoginController(loginUseCase);
    return loginController;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeLogin
});

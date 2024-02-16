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

// src/infra/factory/make-login-admin.ts
var make_login_admin_exports = {};
__export(make_login_admin_exports, {
  MakeAdminLogin: () => MakeAdminLogin
});
module.exports = __toCommonJS(make_login_admin_exports);

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

// src/entities/admin.ts
var import_mongoose = require("mongoose");
var AdminSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);
var AdminModel = (0, import_mongoose.model)("admins", AdminSchema);

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

// src/infra/factory/make-login-admin.ts
var MakeAdminLogin = class {
  static make() {
    const jwt = new JwtToken();
    const hasher = new HashBcrypt();
    const adminRepository = new AdminRepositoryMongo();
    const loginAdminUseCase = new LoginAdminUseCase(adminRepository, hasher, jwt);
    const loginAdminController = new LoginAdminController(loginAdminUseCase);
    return loginAdminController;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeAdminLogin
});

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

// src/infra/factory/make-send-jew-user.ts
var make_send_jew_user_exports = {};
__export(make_send_jew_user_exports, {
  MakeSendJewUser: () => MakeSendJewUser
});
module.exports = __toCommonJS(make_send_jew_user_exports);

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
var yup = __toESM(require("yup"));
function sendJewBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup.object({
      id: yup.string().required(),
      amount: yup.number().required(),
      type: yup.string().required().oneOf(["mind", "power", "space"]).trim()
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

// src/entities/user.ts
var import_mongoose2 = require("mongoose");
var UserSchema = new import_mongoose2.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jewelsAmount: {
      power: { type: Number, default: 0 },
      mind: { type: Number, default: 0 },
      space: { type: Number, default: 0 }
    },
    products: [{ type: import_mongoose2.Schema.Types.ObjectId, ref: "Product" }],
    favoriteProducts: [{ type: import_mongoose2.Schema.Types.ObjectId, ref: "Product" }],
    photo: { type: String }
  },
  { timestamps: true }
);
var UserModel = (0, import_mongoose2.model)("users", UserSchema);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeSendJewUser
});

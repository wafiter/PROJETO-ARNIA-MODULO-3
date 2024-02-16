"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/infra/factory/make-user-logged.ts
var make_user_logged_exports = {};
__export(make_user_logged_exports, {
  MakeUserLogged: () => MakeUserLogged
});
module.exports = __toCommonJS(make_user_logged_exports);

// src/applications/usecases/user/return-user-logged-use-case.ts
var LoggedUserUseCase = class {
  constructor(userRepository, AdmRepository) {
    this.userRepository = userRepository;
    this.AdmRepository = AdmRepository;
  }
  execute(id) {
    return __async(this, null, function* () {
      try {
        const loggedUser = yield this.userRepository.findById(id);
        if (!loggedUser) {
          const loggedUser2 = yield this.AdmRepository.findByID(id);
          return loggedUser2;
        }
        return loggedUser;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeUserLogged
});

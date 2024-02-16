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

// src/infra/repositories/admin-repository-mongo.ts
var admin_repository_mongo_exports = {};
__export(admin_repository_mongo_exports, {
  AdminRepositoryMongo: () => AdminRepositoryMongo
});
module.exports = __toCommonJS(admin_repository_mongo_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminRepositoryMongo
});

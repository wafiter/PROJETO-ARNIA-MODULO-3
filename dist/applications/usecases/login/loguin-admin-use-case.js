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

// src/applications/usecases/login/loguin-admin-use-case.ts
var loguin_admin_use_case_exports = {};
__export(loguin_admin_use_case_exports, {
  LoginAdminUseCase: () => LoginAdminUseCase
});
module.exports = __toCommonJS(loguin_admin_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginAdminUseCase
});

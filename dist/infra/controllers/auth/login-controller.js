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

// src/infra/controllers/auth/login-controller.ts
var login_controller_exports = {};
__export(login_controller_exports, {
  LoginController: () => LoginController
});
module.exports = __toCommonJS(login_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginController
});

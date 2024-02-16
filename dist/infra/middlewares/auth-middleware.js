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

// src/infra/middlewares/auth-middleware.ts
var auth_middleware_exports = {};
__export(auth_middleware_exports, {
  AuthMiddleware: () => AuthMiddleware
});
module.exports = __toCommonJS(auth_middleware_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_config = require("dotenv/config");
var AuthMiddleware = class {
  static handler(req, res, next) {
    const { headers } = req;
    if (!headers.authorization) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const token = headers == null ? void 0 : headers.authorization.replace("Bearer ", "");
    try {
      import_jsonwebtoken.default.verify(token, process.env.SECRET_KEY);
      const payload = import_jsonwebtoken.default.decode(token);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthMiddleware
});

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

// src/applications/usecases/produtct/create-product-use-case.ts
var create_product_use_case_exports = {};
__export(create_product_use_case_exports, {
  CreateProductUseCase: () => CreateProductUseCase
});
module.exports = __toCommonJS(create_product_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateProductUseCase
});

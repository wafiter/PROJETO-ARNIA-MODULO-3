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

// src/applications/usecases/produtct/edit-product-use-case.ts
var edit_product_use_case_exports = {};
__export(edit_product_use_case_exports, {
  EditProductUseCase: () => EditProductUseCase
});
module.exports = __toCommonJS(edit_product_use_case_exports);
var EditProductUseCase = class {
  constructor(productRepository, adminRepository) {
    this.productRepository = productRepository;
    this.adminRepository = adminRepository;
  }
  execute(product, admin) {
    return __async(this, null, function* () {
      const id = product._id;
      try {
        const adm = yield this.adminRepository.findByID(admin);
        if (!adm) {
          throw new Error("unauthorized");
        }
        const productExiste = yield this.productRepository.findById(id);
        if (!productExiste) {
          throw new Error("Product Not Found");
        }
        const result = this.productRepository.updateProduct(productExiste.id, product);
        return result;
      } catch (error) {
        throw new Error(error);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditProductUseCase
});

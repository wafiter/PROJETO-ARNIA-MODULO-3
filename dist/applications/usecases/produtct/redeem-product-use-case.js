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

// src/applications/usecases/produtct/redeem-product-use-case.ts
var redeem_product_use_case_exports = {};
__export(redeem_product_use_case_exports, {
  RedeemProductUseCase: () => RedeemProductUseCase
});
module.exports = __toCommonJS(redeem_product_use_case_exports);
var RedeemProductUseCase = class {
  constructor(productRepository, userRepository) {
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }
  execute(userId, productId, price) {
    return __async(this, null, function* () {
      console.log(productId, userId, price);
      const userExist = yield this.userRepository.findById(userId);
      const productExist = yield this.productRepository.findById(productId);
      console.log(userExist, productExist, productExist == null ? void 0 : productExist.amount);
      if (userExist && productExist && productExist.amount > 0) {
        if (enoughJewels(userExist.jewelsAmount, price)) {
          deductJewels(userExist.jewelsAmount, price);
          userExist.products.push(productExist._id);
          productExist.amount -= 1;
          yield this.productRepository.updateProduct(productExist._id, productExist);
          yield this.userRepository.updateUser(userExist._id, userExist);
          return "Successfully, the product has been added to your pack";
        } else {
          throw new Error("User does not have enough gems to redeem this product");
        }
      } else {
        throw new Error("Product not found or product out of stock");
      }
    });
  }
};
function enoughJewels(jewelsAmount, price) {
  const totalJewels = jewelsAmount.power + jewelsAmount.mind + jewelsAmount.space;
  return totalJewels >= price;
}
function deductJewels(jewelsAmount, requiredAmount) {
  const totalJewels = jewelsAmount.power + jewelsAmount.mind + jewelsAmount.space;
  const remainingJewels = totalJewels - requiredAmount;
  const jewelsForEach = remainingJewels / 3;
  jewelsAmount.power = jewelsForEach;
  jewelsAmount.mind = jewelsForEach;
  jewelsAmount.space = jewelsForEach;
  const remaining = remainingJewels % 3;
  jewelsAmount.power += remaining;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedeemProductUseCase
});

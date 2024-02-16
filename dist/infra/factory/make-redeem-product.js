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

// src/infra/factory/make-redeem-product.ts
var make_redeem_product_exports = {};
__export(make_redeem_product_exports, {
  MakeRedeemProduct: () => MakeRedeemProduct
});
module.exports = __toCommonJS(make_redeem_product_exports);

// src/applications/usecases/produtct/redeem-product-use-case.ts
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

// src/infra/validations/reedem-product-body-validation.ts
var yup = __toESM(require("yup"));
function redeemProductBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup.object({
      productId: yup.string().required(),
      price: yup.number().required()
    });
    try {
      yield bodyType.validate(body);
      return { isValid: true, message: "" };
    } catch (error) {
      return { isValid: false, message: error.errors };
    }
  });
}

// src/infra/controllers/products/redeem-product-controller.ts
var RedeemProductController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const body = req.body;
      const bodyIsValid = yield redeemProductBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      const id = req.params.id;
      const { productId, price } = body;
      try {
        const result = yield this.usecase.execute(id, productId, price);
        return res.json(result);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  }
};

// src/entities/product.ts
var import_mongoose = require("mongoose");
var ProductSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String }
  },
  { timestamps: true }
);
var ProductModel = (0, import_mongoose.model)("products", ProductSchema);

// src/infra/repositories/product-repository-mongo.ts
var ProductRepositoryMogo = class {
  create(productData) {
    return __async(this, null, function* () {
      try {
        yield ProductModel.create(productData);
      } catch (error) {
        throw new Error("Unable to create product in database");
      }
    });
  }
  findAll() {
    return __async(this, null, function* () {
      return yield ProductModel.find({ amount: { $gt: 0 } });
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      try {
        const product = yield ProductModel.findById(id);
        return product;
      } catch (error) {
        throw new Error("ID NOT FOUND IN THE DATABASE");
      }
    });
  }
  updateProduct(id, product) {
    return __async(this, null, function* () {
      try {
        const updateProduct = yield ProductModel.findByIdAndUpdate(id, product);
        return updateProduct == null ? void 0 : updateProduct.updatedAt;
      } catch (error) {
        throw new Error("id or product, not found in the database");
      }
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

// src/infra/factory/make-redeem-product.ts
var MakeRedeemProduct = class {
  static make() {
    const productRepository = new ProductRepositoryMogo();
    const userRepository = new UserRepositoryMogo();
    const usecase = new RedeemProductUseCase(productRepository, userRepository);
    const controller = new RedeemProductController(usecase);
    return controller;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeRedeemProduct
});

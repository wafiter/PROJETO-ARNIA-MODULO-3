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

// src/infra/factory/make-list-products.ts
var make_list_products_exports = {};
__export(make_list_products_exports, {
  MakeProductList: () => MakeProductList
});
module.exports = __toCommonJS(make_list_products_exports);

// src/applications/usecases/produtct/list-products-use-case.ts
var ListProductsUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  execute() {
    return __async(this, null, function* () {
      const allProducts = yield this.productRepository.findAll();
      return allProducts;
    });
  }
};

// src/infra/controllers/products/list-product-controller.ts
var ListProductController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      try {
        const result = yield this.usecase.execute();
        return res.json({ products: result });
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

// src/infra/factory/make-list-products.ts
var MakeProductList = class {
  static make() {
    const repository = new ProductRepositoryMogo();
    const usecase = new ListProductsUseCase(repository);
    const controller = new ListProductController(usecase);
    return controller;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeProductList
});

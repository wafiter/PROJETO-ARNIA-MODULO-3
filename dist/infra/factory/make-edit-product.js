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

// src/infra/factory/make-edit-product.ts
var make_edit_product_exports = {};
__export(make_edit_product_exports, {
  MakeEditProduct: () => MakeEditProduct
});
module.exports = __toCommonJS(make_edit_product_exports);

// src/applications/usecases/produtct/edit-product-use-case.ts
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

// src/infra/validations/edit-product-body-validations.ts
var yup = __toESM(require("yup"));
function editProductBodyValidation(body) {
  return __async(this, null, function* () {
    const bodyType = yup.object({
      _id: yup.string().required(),
      name: yup.string().required(),
      value: yup.string().required(),
      amount: yup.string().required(),
      description: yup.string().required(),
      photo: yup.string()
    });
    try {
      yield bodyType.validate(body);
      return { isValid: true, message: "" };
    } catch (error) {
      return { isValid: false, message: error.errors };
    }
  });
}

// src/infra/controllers/products/edit-product-controller.ts
var EditProductController = class {
  constructor(usecase) {
    this.usecase = usecase;
  }
  handler(req, res) {
    return __async(this, null, function* () {
      const adminId = req.params.id;
      const { body } = req;
      const bodyIsValid = yield editProductBodyValidation(body);
      if (!bodyIsValid.isValid) {
        return res.status(400).json({ message: bodyIsValid.message });
      }
      try {
        yield this.usecase.execute(body, adminId);
        return res.status(201).json({ message: "product Editado" });
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

// src/entities/product.ts
var import_mongoose2 = require("mongoose");
var ProductSchema = new import_mongoose2.Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String }
  },
  { timestamps: true }
);
var ProductModel = (0, import_mongoose2.model)("products", ProductSchema);

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

// src/infra/factory/make-edit-product.ts
var MakeEditProduct = class {
  static make() {
    const admRepository = new AdminRepositoryMongo();
    const productRepository = new ProductRepositoryMogo();
    const editProductUseCase = new EditProductUseCase(productRepository, admRepository);
    const createProductController = new EditProductController(editProductUseCase);
    return createProductController;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeEditProduct
});

import { Schema, model, Document } from "mongoose";

export interface RepUser extends Document {
  name: string;
  email: string;
  password: string;
  jewelsAmount:  {
    power: { type: Number, default: 0 },
    mind: { type: Number, default: 0 },
    space: { type: Number, default: 0 },
  };
  products: Schema.Types.ObjectId[];
  favoriteProducts: Schema.Types.ObjectId[];
  photo: string;
}

export const UserSchema = new Schema<RepUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jewelsAmount: {
      power: { type: Number, default: 0 },
      mind: { type: Number, default: 0 },
      space: { type: Number, default: 0 },
    } ,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    favoriteProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    photo: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model("users", UserSchema);

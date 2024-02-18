import { Schema, model, Document, } from "mongoose";

export interface RepProduct extends Document {
    name: string,
    value: number,
    amount: number,
    description: string,
    photo: string
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProductModel = model("products", ProductSchema);

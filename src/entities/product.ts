import { Schema, model, Document, ObjectId } from "mongoose";

export interface RepProduct extends Document {
    name: string,
    value: number,
    amount: number,
    description: string,
    photo?: string | null | undefined
}

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true }
);

export const ProductModel = model("products", ProductSchema);

import { Schema, model } from "mongoose"

const ProductSchema = new Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String }
}, { timestamps: true })

export const AdminModel = model("products", ProductSchema)
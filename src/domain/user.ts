import { Schema, model } from "mongoose";

export interface RepUser {
    name: string
    email: string
    password: string
    jewelsAmount: number
    products: Schema.Types.ObjectId[]
    favoriteProducts: Schema.Types.ObjectId[]
    photo: string
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jewelsAmount: { type: Number, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    photo: { type: String }
}, { timestamps: true });

export const UserModel = model("users", UserSchema)



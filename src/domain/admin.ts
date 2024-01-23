import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

export const AdminModel = model("admins", AdminSchema)
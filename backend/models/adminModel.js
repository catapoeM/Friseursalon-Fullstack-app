import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: Boolean, required: true},
    }
);

const Admin = mongoose.model("Admin", adminSchema);
export {Admin};
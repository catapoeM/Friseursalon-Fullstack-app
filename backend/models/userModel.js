import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    admin: {type: Boolean, required: true},
}, {timestamps: true});

const passwordsSchema = new mongoose.Schema({
    password: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

const User = mongoose.model("User", userSchema);
const Password = mongoose.model('Password', passwordsSchema);

export {User, Password}
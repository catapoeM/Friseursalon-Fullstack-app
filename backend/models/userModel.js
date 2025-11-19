import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    admin: {type: Boolean, required: true},
}, {timestamps: true});

const passwordsSchema = new mongoose.Schema({
    password: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

const bookingSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    service: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    phone: {type: String, required: true},
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
const Password = mongoose.model('Password', passwordsSchema);
const Booking = mongoose.model("Booking", bookingSchema);

export {User, Password, Booking}
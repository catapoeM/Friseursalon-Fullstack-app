import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    service: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    phone: {type: String, required: true},
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    admin: {type: Boolean, required: true},
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export {Booking, User};
import mongoose, { mongo } from "mongoose";

const bookingSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    service: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
}, {timestamps: true});

const visitorVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

const Booking = mongoose.model("Booking", bookingSchema);
const VisitorVerification = mongoose.model("Visitor", visitorVerificationSchema);

export {Booking, VisitorVerification}
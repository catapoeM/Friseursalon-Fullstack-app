import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    service: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
}, {timestamps: true});

// Wichtig: unique Indexe für Email und Phone
bookingSchema.index({ email: 1 }, { unique: true });
bookingSchema.index({ phone: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);

export {Booking}
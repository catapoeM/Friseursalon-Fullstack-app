import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    service: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    phone: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    expiresAt: {type: Date, required: true},
}, {timestamps: true});

const visitorVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Automatisch löschen, wenn abgelaufen (MongoDB TTL index)
visitorVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
bookingsSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Bookings = mongoose.model("Bookings", bookingsSchema);
const VisitorVerification = mongoose.model("Visitor", visitorVerificationSchema);

export {Bookings, VisitorVerification}
import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    date: {type: Date, required: true},
    startHour: {type: Number, required: true},
    endHour: {type: Number, required: true},
    stylistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stylist',
      required: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    clientType: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    clientAdditionalNotes: {type: String},
    confirmed: {type: Boolean, default: false},
    isCanceled: {type: Boolean, default: false},
}, {timestamps: true});

const UserVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Automatisch löschen, wenn abgelaufen (MongoDB TTL index)
UserVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
bookingsSchema.index(
  {createdAt: 1}, {expireAfterSeconds: 300, partialFilterExpression: {confirmed: false}}
);

const Bookings = mongoose.model("Bookings", bookingsSchema);
const UserVerification = mongoose.model("Visitor", UserVerificationSchema);

export {Bookings, UserVerification}
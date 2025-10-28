import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: String,
    service: String,
    date: String,
    time: String,
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
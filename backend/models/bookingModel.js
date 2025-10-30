import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    service: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    phone: {type: String, required: true},
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

const getAllBookings = async () => {
  try {
    const bookings = await Booking.find(); // ← get everything
    console.log(bookings + ' All data find()!');
  } catch (error) {
    console.log(error + " error db while reading the data with find()");
  }
};

getAllBookings();

export default Booking;
import Booking from "../models/bookingModel.js";

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    await booking.save();
    return booking;
};

export const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};
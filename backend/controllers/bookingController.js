import Booking from "../models/bookingModel.js";
import { validatePhoneNumber }  from "../middlewares/handleValidation.js";

export const getBookings = async (req, res) => {
    if (validatePhoneNumber(req.body.phone)) {
        try {
            const bookings = await Booking.find();
            res.status(200).json(bookings);
        }   catch (error) {
            res.status(500).json({message: error.message});
        }
    }else {
        return res.status(400).json({message: "Ungültige Telefonnummer"})
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
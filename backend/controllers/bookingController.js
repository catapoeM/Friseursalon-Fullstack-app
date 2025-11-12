import Booking from "../models/bookingModel.js";
import { validatePhoneNumber}  from "../validators/bookingValidation.js";

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getOneBooking = async (req, res) => {
    const id = req.params.id;

    // Booking searching with Phone number or Family name
    const foundOneBooking = await Booking.findById(id);

    if (!foundOneBooking) {
        return res.status(404).send('Buchung wurde nicht gefunden...')
    }
    res.json(foundOneBooking);
}

const createBooking = async (req, res) => {
    const {firstName, lastName, date, time, service, phone} = req.body;
    if (validatePhoneNumber(phone)) {
        const bookingData = {firstName, lastName, date, time, service, phone}
        try {
            const booking = new Booking(bookingData);
            await booking.save();
            
            return res.status(200).json(booking);

        } catch (error) {
            return res.status(400).json({message: "Error ", error});
        }
    }else {
        return res.status(400).json({message: "Ungültige Telefonnummer"})
    }

};

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {createBooking, getOneBooking, getBookings, notFound}
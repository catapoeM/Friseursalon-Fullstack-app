import Booking from "../models/bookingModel.js";
import { validatePhoneNumber}  from "../validators/bookingValidation.js";

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getMyBookings = async (req, res) => {
    const {login, authCode} = req.matchedData;
    
    // Member suchen über Email-Adresse ODER Nickname
    const foundBooking = await Booking.find({
        $or: [{phone: login}, {email: login}]
    });

    // Booking searching with Phone number or Family name
   //const foundBooking = await Booking.findById(id);

    if (!foundBooking) {
        return res.status(404).send('Buchung wurde nicht gefunden...')
    }
    
    // Token erzeugen mit ID des Members
    const token = getToken({id: foundBooking._id});
    // Token an der Client senden
    res.send(token);
}

const createBooking = async (req, res) => {
    const {firstName, lastName, date, time, service, phone, email} = req.body;
    if (validatePhoneNumber(phone)) {
        const bookingData = {firstName, lastName, date, time, service, phone, email}
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

const deleteBooking = async (req, res) => {
    // ID aus Params holen
    const {id} = req.params;

    // Member.findByIdAndDelete() suchen und löschen
    const deletedOneBooking = await Member.findOneAndDelete({_id: id});

    if (!deletedOneBooking) {
        return res.status(404).send('Booking not found ...')
    }
    res.send('Booking was successfully deleted!')
}

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {createBooking, getMyBookings, getAllBookings, deleteBooking, notFound}
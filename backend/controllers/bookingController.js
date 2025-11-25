import {Bookings} from "../models/bookingModel.js";
import { User } from "../models/userModel.js";
import { getToken } from "../common/index.js";

import dotenv from 'dotenv';

dotenv.config();

const getAllBookings = async (req, res) => {
    try {
        /*const allBookingsByDateAndTime = 
            await Bookings.find({}, 
            {date: 1, time: 1, _id: 0})
            .sort({date: 1});
        */
       const allBookingsByDateAndTime = await Bookings.find({}).sort({date: 1})
        return res.status(200).json(allBookingsByDateAndTime);
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getMyBookings = async (req, res) => {
    const {login} = req.matchedData;
    
    // Member suchen über Email-Adresse ODER Nickname
    const foundBooking = await Bookings.find({
        $or: [{phone: login}, {email: login}]
    }).sort({date: 1, time: 1});

    // Bookings searching with Phone number or Family name
   //const foundBooking = await Bookings.findById(id);

    if (!foundBooking) {
        return res.status(404).send('Buchung wurde nicht gefunden...')
    }
    
    // Token erzeugen mit ID des Members
    const token = getToken({id: foundBooking._id}, process.env.JWT_SECRET, '1h');
    console.log(token, ' token')
    // Token an der Client senden
    res.send(token);
}

const visitorCreateBooking = async (req, res) => {
    try {
        const data = req.matchedData;
        const existing = await Bookings.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });
        console.log(existing, ' existing')
        if (existing) {
        return res.status(400).json({ message: "You already have a booking. Please change your booking!" });
        }
        const booking = await Bookings.create(data);
        return res.status(201).json(booking);
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: err.message });
    }
};

const deleteBooking = async (req, res) => {
    // ID aus Params holen
    const {id} = req.params;

    // Member.findByIdAndDelete() suchen und löschen
    const deletedOneBooking = await User.findOneAndDelete({_id: id});

    if (!deletedOneBooking) {
        return res.status(404).send('Bookings not found ...')
    }
    res.send('Bookings was successfully deleted!')
}

const deleteAllBookings = async (req, res) => {
    try {
        const findDocuments = await Bookings.find({});
        if (findDocuments) {
            await Bookings.deleteMany({});
            return res.send('Database User DELETED')
        }
    } catch (error) {
        res.send(error, ' Error')
    }
};

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {visitorCreateBooking, getMyBookings, getAllBookings, deleteBooking, deleteAllBookings, notFound}
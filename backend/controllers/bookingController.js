import {Bookings, UserVerification} from "../models/bookingModel.js";
import { User } from "../models/userModel.js";
import { createEmailAndSend, fromStringToDatePlusExtraHours } from "../common/index.js";
import random from 'random';


import dotenv from 'dotenv';

dotenv.config();

// Rufe alle Buchungen auf von der Buchungsliste (Time slot: calendar available dates)
const getAllBookings = async (req, res) => {
    try {
       const allBookingsByDateAndTime = await Bookings.find({}).sort({start: 1})
        return res.status(200).json(allBookingsByDateAndTime);
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Rufe Meine Buchungen von der Buchungsliste auf
// Damin man seine Buchungen bekommt, muss man als visitor: entweder authentifizieren (email -> code -> verify)
// oder Wenn man schon authentifiziert wurde un mit token (Wenn token noch gültig ist)
const getMyBookings = async (req, res) => {
    try {
        if (req.session && req.session.booking && req.session.booking.email) {
            // Member suchen über Email-Adresse
            const foundBookings = await Bookings.find({email}).sort({start: 1, time: 1});
            if (foundBookings) {
                return res.status(200).send(foundBookings, ' Bookings found!');
            }
            else {
                return res.status(404).send('Buchung wurde nicht gefunden...')
            }
        }else {
            //res.redirect('http://localhost:5000' + req.baseUrl + '/visitor/request-code')
            return res.status(404).send('To find your booking please go to the "request-code" page and verify it! (Authenticate)' )
        }
    } catch (error) {
        console.log(error, 'Error found on *getMyBookings!');
    }
}


const createBooking = async (req, res) => {
    try {
        // Phone und Email aus req.matchedData rausholen
        const {phone, email} = req.matchedData;
        // Suche in DB, ob es eine Buchung mit dem Phone oder Email gibt
        const foundBookings = await Bookings.findOne({
            $or: [{phone}, {email}]
        })
        // Wenn true dann man muss die Buchung ändern
        if (foundBookings) {
            return res.status(400).json({ message: "You already have a booking. Please change your booking!" });
        }
        const data = req.matchedData;
        // Wenn nicht gefunden, dann im Session speichern
        // Speichert in Session
        req.session.booking = data;
        console.log(req.session.booking, ' req.session.booking')
        console.log(req.baseUrl)
        // Weiterleiten zur Code-Anfrage
        //res.redirect('http://localhost:5000' + req.baseUrl + '/request-code')
        res.send(req.session)
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: err.message });
    }
};


const requestCode = async (req, res) => {
    try {
        // Wenn session nicht aufgefunden wird dann >
        console.log(req.session, ' session booking')
        if (!req && !req.session && !req.session.booking) {
            console.log(req.session.booking + ' No session booking!')
        }
        else if (req && req.session && req.session.booking && req.session.booking.email){
            const email = req.session.booking.email;
            const code = random.int(100000, 999999).toString();
            const expiresAt = new Date(Date.now() + 10 * 60 * 500); // expires in 5 minutes
            // Anrufen die Funktion, um die Email an den Client zu schicken
            const emailSent = await createEmailAndSend(code);
            // Code im session speichern
            console.log(emailSent, ' sent')
            if (emailSent) {
                req.session.booking.verificationCode = code;
                try {
                    const verificationCodeUpdate = await UserVerification.create({
                        email,
                        code,
                        expiresAt
                    });
            
                    console.log(verificationCodeUpdate, ' verificationCodeUpdate')
                    // Weiterleitung zur Eingabemaske
                    //res.redirect('http://localhost:5000' + req.baseUrl + '/verify-code');
                    return res.json("emailSent");
                }   catch(error) {
                        return res.status(500).json({message: err.message});
                }
            }else {
                res.status(500).json("Email not sent + Error") 
            }
        }else {
            res.status(404).json(email, " Email not found!");
        }
    }   catch (err) {
            console.log(error, 'Error found on request code controller!');
    }
}

const verifyCode = async (req, res) => {
    console.log(req.session.booking, ' req sess')
    try {
        if (req.session &&
            req.session.booking && req.session.booking.email) {
            const email = req.session.booking.email;
            const entry = await UserVerification.where({email}).findOne();
            console.log(entry, ' entry');
            const expiresAt = fromStringToDatePlusExtraHours(req.session.booking.end, 24);
            req.session.booking.expiresAt = expiresAt;
            if (entry) {
                const bookingSaved = await Bookings.create(req.session.booking);
                //Löscht jeden Code der im DB befindet mit dem Email
                await UserVerification.where({email}).deleteMany();
                return res.json('Booking confirmed - ' + bookingSaved);
    
            }else {
                return res.json('Booking not found!')
            }
        }else {
            res.status(500).json({ message: 'Session err!' });
        }
    }   catch(error) {
        console.log(error, 'Error found on verify code controller!');
    }
}


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

export {createBooking, getMyBookings, 
    getAllBookings, deleteBooking, deleteAllBookings, 
    requestCode, verifyCode, notFound}
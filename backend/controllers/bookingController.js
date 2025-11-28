import {Bookings, VisitorVerification} from "../models/bookingModel.js";
import { User } from "../models/userModel.js";
import { generateNumericCode, getToken } from "../common/index.js";
import nodemailer from "nodemailer";


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

const visitorCreateBooking = async (req, res) => {
    try {
        const data = req.matchedData;
        console.log(data, ' data')
        const existing = await Bookings.findOne().select({email: data.email});
        console.log(existing, ' existing')
        if (existing) {
            return res.status(400).json({ message: "You already have a booking. Please change your booking!" });
        }
        // Speichert in Session
        req.session.booking = data;
        console.log(req.session.booking, ' req.session.booking')
        console.log(req.baseUrl)
        // Weiterleiten zur Code-Anfrage
        res.redirect('http://localhost:5000' + req.baseUrl + '/visitor/request-code')
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: err.message });
    }
};

const requestCode = async (req, res) => {
    console.log(req.session.booking, ' session booking')
    if (!req.session.booking) {
        return res.redirect(req.baseUrl)
    }
    const email = req.session.booking.email;
    const code = generateNumericCode(6);
    req.session.booking.verificationCode = code;
    try {
        const verificationCodeUpdate = await VisitorVerification.create({
            email,
            code,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // expires in 10 minutes
        });

        console.log(verificationCodeUpdate, ' verificationCodeUpdate')
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            secure: false,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
    
        const emailSent = await transporter.sendMail({
            from: '"Test" <test@example.com>',
            to: process.env.NODEMAILER_USER,
            subject: "Your verification code",
            text: `Code: ${code}. Valid for 10 minutes.`
        });
        console.log(emailSent, ' email sent');
    
        // Weiterleitung zur Eingabemaske
        res.redirect('http://localhost:5000' + req.baseUrl + '/verify-code');
    }   catch(error) {
        
    }
}

const verifyCode = async (req, res) => {
    try {
        const email = req.session.booking.email;
        const entry = await VisitorVerification.where({email}).findOneAndDelete({code: req.session.booking.verificationCode});
        console.log(entry, ' entry')
        if (entry && req.session.booking) {
            const bookingSaved = await Bookings.create(req.session.booking);
            return res.json('Booking confirmed - ' + bookingSaved);

        }else {
            return res.json('Booking not found!')
        }
    }   catch(error) {
        console.log(error, 'Error found on request code route!');
    }
}

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

export {visitorCreateBooking, getMyBookings, getAllBookings, deleteBooking, deleteAllBookings, requestCode, verifyCode, notFound}
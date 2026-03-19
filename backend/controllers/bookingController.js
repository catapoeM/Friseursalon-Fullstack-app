import {Bookings, UserVerification} from "../models/bookingModel.js";
import Stylist from "../models/stylistModel.js";
import { createEmailAndSend,
    getHash, checkHash, randomNumber} from "../common/index.js";
import {getToken, getServiceNamesByIds} from "../common/index.js";
import dotenv from 'dotenv';
import { bookingExists } from "../services/booking.js";

dotenv.config();

const createBooking = async (req, res) => {
    try {
        // Phone und Email aus req.matchedData rausholen
        const {phone, email, date, startHour, endHour} = req.matchedData;
        // Suche in DB, ob es eine Buchung mit dem Phone oder Email gibt
        // Phone und Email aus req.matchedData rausholen
        const {serviceId} = req.matchedData;
        const {id} = req.params;

        const foundBookings = await Bookings.find({
            $or: [{phone}, {email}]
        })
        const now = new Date();
        
        
        // Wenn true dann man muss die Buchung ändern
        for (let i = 0; i < foundBookings.length; ++i) {
            let dateAndHourOfTheEndOfBooking = foundBookings[i]
            dateAndHourOfTheEndOfBooking.date.setHours(foundBookings[i].endHour)
            const convertedToDateObj = new Date(dateAndHourOfTheEndOfBooking.date)
            if (foundBookings[i] && !foundBookings[i].isCanceled && now < convertedToDateObj) {
                return res.status(400).json({ message: "Sie haben schon eine Buchung!" });
            }
        }
        
        // 1️ Basic validation
        if (!id || (!serviceId && serviceId.length > 0)) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // 2️ Find stylist
        const stylist = await Stylist.findById(id);
        if (!stylist) {
            return res.status(404).json({ error: "Stylist not found" });
        }
        let servicesAmount = 0;
        let serviceFound = false;
        // 3️ Find service inside stylist
        for (let i = 0; i < serviceId.length; ++i) {
            if (stylist.services.id(serviceId[i])) {
                servicesAmount++;
                serviceFound = true;
            }
        }
        if (servicesAmount !== serviceId.length && serviceFound) {
            return res.status(404).json({ error: "Service/services not found for this stylist" });
        }

        const exists = await bookingExists(id, date, startHour, endHour)
        if (exists) {
            return res.status(409).json({ error: "Time slot already booked" });
        }
        
        const objData = req.matchedData;
        objData.stylistId = id;

        // Wenn nicht gefunden, dann im Session speichern
        // Speichert in Session
        // Vorher muss man nur encrypted objData in Session speichern
        
        const bookingSaved = await Bookings.create(objData);
        const bookingObj = {
            id : bookingSaved._id.toString(),
            firstName: bookingSaved.firstName,
            lastName: bookingSaved.lastName,
            email: bookingSaved.email,
            startHour: bookingSaved.startHour,
            endHour: bookingSaved.endHour,
            date: bookingSaved.date
        };
        //const encryptedData = encryptObject(bookingSaved);
        req.session.booking = bookingObj
        res.status(200).send('ok')
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: error.message });
    }
};

const cancelBookingPatch = async (req, res) => {
    try {
        const { code, bookingId } = req.body;
        const today = new Date();
        const booking = await Bookings.findById(bookingId);
        if (!booking || booking.isCanceled) {
            return res.status(404).json({error: "Booking not found!"})
        }else if (today >= booking.date) {
            return res.status(404).json({error: "You cannot cancel the booking anymore. Expired or too late!"})
        }
        const isValid = checkHash(code, booking.code);
        if (!isValid) {
            return res.status(403).send("Invalid code! PUT");
        }

        booking.isCanceled = true;
        await booking.save();
        const emailContent = {
            from: '"Test" <test@example.com>',
            to: process.env.NODEMAILER_USER,
            subject: "Booking CANCELED!",
            html: `<p> ${booking.firstName} ${booking.lastName}, your booking has been canceled successfully </p> 
                    </p>`
        }
        // Anrufen die Funktion, um die Email an den Client zu schicken
        await createEmailAndSend(emailContent);
        res.json({message: "Booking canceled - ", booking});

    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: error.message + ' error' });
    }
};

const requestCode = async (req, res) => {
    try {
        if (req.sessionID) {
            const objData = req.session.booking;
            const email = objData.email;
            const code = randomNumber();
            const expiresAt = new Date(Date.now() + 10 * 60 * 500); // expires in 5 minutes

            const emailContent = {
                from: '"Test" <test@example.com>',
                to: process.env.NODEMAILER_USER,
                subject: "Your verification code",
                text: `Code: ${code}. Valid for 5 minutes.`
            }
            // Anrufen die Funktion, um die bookingId an den Client zu schicken
            const emailSent = await createEmailAndSend(emailContent);
            // bcrypt the code before saving in DB          
            if (emailSent) {
                //const encryptedData = encryptObject(objData);
                req.session.booking = objData;
                try {
                    const verificationCodeUpdate = await UserVerification.create({
                        email,
                        code,
                        expiresAt
                    });
                    if (verificationCodeUpdate) {
                        return res.json("emailSent");
                    }
                }   catch(error) {
                        return res.status(500).json({message: error.message});
                }
            }else {
                res.status(500).json("Email not sent + Error") 
            }
        }else {
            res.status(404).json(" Session not found!");
        }
    }   catch (error) {
            console.log(error, 'Error found on request code controller!');
    }
}

const verifyCode = async (req, res) => {
    try {
        if (req.sessionID) {
            const {verifyCode} = req.matchedData;
            const objData = req.session.booking;
            const email = objData.email;
            const bookingId = req.session.booking.id;
            const userVerificationCode = await UserVerification.findOne(
                {
                    email: email, 
                    code: verifyCode
                }
            );
            if (userVerificationCode.code !== verifyCode) {
                return res.status(400).json('Code not working! Not Equal with DB code');
            }
            let baseLink = 'http://localhost:5000' + req.baseUrl;
            
            const code = randomNumber();
            const codeHashed = getHash(code);

            const booking = await Bookings.findById(bookingId);
            if (!booking || booking.isCanceled) {
                return res.status(404).json({error: "Booking not found!"})
            }else if (booking) {
                booking.confirmed = true;
                booking.code = codeHashed;
                await booking.save();
            }

            const stylist = await Stylist.findById(booking.stylistId)
            if (stylist) {
                const matchedServices = getServiceNamesByIds(booking.serviceId, stylist.services)

                const bookingCancelLink = baseLink + "/cancel?code=" + code + "&bookingId=" + bookingId;

                const isoDate = objData.date;
                const onlyDate = isoDate.split("T")[0];
                
                const serviceName = matchedServices.join(',') || "services Name"
                const stylistName = stylist.name || "Stylist Name"
                //Löscht jeden Code der im DB befindet mit dem Email
                await UserVerification.where(email).deleteMany();
                
                const emailContent = {
                    from: '"Test" <test@example.com>',
                    to: process.env.NODEMAILER_USER,
                    subject: "Booking confirmation!",
                    html: `<p> ${objData.firstName} ${objData.lastName}, your booking has been created successfully </p> 
                            <p> Your booking details:  You have a booking: ${onlyDate} which will be from ${objData.startHour}  to ${objData.endHour + 1} .</p> 
                            <p> For the services: ${serviceName} by the stylist: ${stylistName} </p> 
                            <p>
                                <strong>Cancel your booking:</strong><br>
                                <a href="${bookingCancelLink}" target="_blank">${bookingCancelLink}</a>
                            </p>`
                }
                // Anrufen die Funktion, um die Email an den Client zu schicken
                const isEmailSent = await createEmailAndSend(emailContent);
                if (isEmailSent) {
                    return res.json('Buchung wurde erfolgreich bestätigt! - ' + booking);
                }
                return res.status(400).json('Buchung konnte nicht bestätigt werden! 1');
            }
            return res.status(400).json('Buchung konnte nicht bestätigt werden! 2');
            
        }else {
            return res.status(500).json({ message: 'Session error!' });
        }
    }   catch(error) {
        console.log(error, 'Error found on verify code controller!');
    }
}

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {createBooking, cancelBookingPatch,
    requestCode, verifyCode, notFound}
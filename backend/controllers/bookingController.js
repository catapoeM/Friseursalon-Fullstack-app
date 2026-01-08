import {Bookings, UserVerification} from "../models/bookingModel.js";
import { createEmailAndSend, fromStringToDatePlusExtraHours, encryptObject, cryptTheCode,
     decryptObject, getHash, checkHash, randomNumber, formatDateTimeUTC} from "../common/index.js";
import {getToken} from "../common/middlewares.js";
import dotenv from 'dotenv';

dotenv.config();

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
        if (foundBookings || (foundBookings && !foundBookings.isCanceled)) {
            return res.status(400).json({ message: "Sie haben schon eine Buchung!" });
        }
        const objData = req.matchedData;

        // Wenn nicht gefunden, dann im Session speichern
        // Speichert in Session
        // Vorher muss man nur encrypted objData in Session speichern
        console.log(objData, ' objData')
        const encryptedData = encryptObject(objData);
        req.session.booking = encryptedData;
        console.log(req.session.booking, ' req.session.booking (Encrypted)')
        console.log(req.baseUrl)
        // Weiterleiten zur Code-Anfrage
        //res.redirect('http://localhost:5000' + req.baseUrl + '/request-code')
        res.send(req.session)
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: error.message });
    }
};

const editBookingGet = async (req, res) => {
    try {
        const { id } = req.params;
        const { code } = req.query;
        const booking = await Bookings.findById(id);
        if (booking.isCanceled) {
            return res.status(404).json({error: "Booking not found!"})
        }

        if (!booking) {
            return res.status(404).send("Booking not found!");
        }
        const isValid = checkHash(code, booking.code);
        console.log(code + " " +  booking.code)
        if (!isValid) {
            return res.status(403).send("Invalid code!!Get");
        }

        res.json(booking);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: error.message + ' error'});
    }
};

const editBookingPut = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.matchedData;
        const { code } = req.query;

        const booking = await Bookings.findById(id);
        if (!booking || booking.isCanceled) {
            return res.status(404).json({error: "Booking not found!"})
        }
        const isValid = checkHash(code, booking.code);
        if (!isValid) { 
            return res.status(403).send("Invalid code! PUT");
        }

        booking.start = data.start;
        booking.end = data.end;
        booking.service = data.service;
        booking.stylist = data.stylist;

        const humanReadableDateAndTimeStart = formatDateTimeUTC(booking.start, 'de-DE');
        //const humanReadableDateAndTimeEnd = formatDateTimeUTC(booking.end, 'de-DE');
        await booking.save();
        const emailContent = {
            from: '"Test" <test@example.com>',
            to: process.env.NODEMAILER_USER,
            subject: "Booking EDITED!",
            html: `<p> ${booking.firstName} ${booking.lastName}, your booking has been edited successfully </p> 
                    <p> Your new booking details: You have a new booking: ${humanReadableDateAndTimeStart} which will take: "" hours.</p> 
                    <p> For the service: ${booking.service}  with the stylist: ${booking.stylist} </p>
                </p>`
        }
        // Anrufen die Funktion, um die Email an den Client zu schicken
        await createEmailAndSend(emailContent);
        res.json({message: "Booking updated - ", booking})

    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: error.message + ' error' });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { code } = req.query;

        const booking = await Bookings.findById(id);
        if (!booking || booking.isCanceled) {
            return res.status(404).json({error: "Booking not found!"})
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
        if (req && req.session && req.session.booking) {
            const objData = decryptObject(req.session.booking);
            console.log(objData, ' obj data!!!');
            const email = objData.email;
            console.log(email, ' email!!! from the obj data')
            const code = randomNumber();
            const expiresAt = new Date(Date.now() + 10 * 60 * 500); // expires in 5 minutes

            const emailContent = {
                from: '"Test" <test@example.com>',
                to: process.env.NODEMAILER_USER,
                subject: "Your verification code",
                text: `Code: ${code}. Valid for 5 minutes.`
            }
            // Anrufen die Funktion, um die Email an den Client zu schicken
            const emailSent = await createEmailAndSend(emailContent);
            // bcrypt the code before saving in DB          
            if (emailSent) {
                console.log(objData, ' obj data 2222222')
                const encryptedData = encryptObject(objData);
                req.session.booking = encryptedData;
                console.log(req.session.booking, ' session booking 333')
                try {
                    const verificationCodeUpdate = await UserVerification.create({
                        email,
                        code,
                        expiresAt
                    });
            
                    console.log(verificationCodeUpdate, ' verificationCodeUpdate');
                    console.log(emailSent, ' sent');
                    // Weiterleitung zur Eingabemaske
                    //res.redirect('http://localhost:5000' + req.baseUrl + '/verify-code');
                    return res.json("emailSent");
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
        if (req && req.session && req.session.booking) {
            const objData = decryptObject(req.session.booking);
            console.log(objData, ' obj data+++')
            const email = objData.email;
            const userVerificationCode = await UserVerification.findOne({email});
            console.log(userVerificationCode, ' userVerificationCode');
            const expiresAt = fromStringToDatePlusExtraHours(objData.end, 24);
            objData.expiresAt = expiresAt;
            // Token erzeugen mit ID des Members
            const token = getToken(objData, process.env.JWT_SECRET, '24h');
            if (userVerificationCode && token) {
                let bookingEditLink = 'http://localhost:5000' + req.baseUrl + '/';
                console.log(objData);

                const codeCrypted = cryptTheCode(userVerificationCode.code);
                const codeHashed = getHash(codeCrypted);
                objData.code = codeHashed;
                objData.isCanceled = false;
                const bookingSaved = await Bookings.create(objData);
                const bookingCancelLink = bookingEditLink + bookingSaved._id + "/cancel?code=" + codeCrypted;
                bookingEditLink += bookingSaved._id + "/edit?code=" + codeCrypted;
                //Löscht jeden Code der im DB befindet mit dem Email
                await UserVerification.where(email).deleteMany();
                delete req.session.booking;
                const humanReadableDateAndTimeStart = formatDateTimeUTC(objData.start, 'de-DE');
                //const humanReadableDateAndTimeEnd = formatDateTimeUTC(objData.end, 'de-DE');
                const emailContent = {
                    from: '"Test" <test@example.com>',
                    to: process.env.NODEMAILER_USER,
                    subject: "Booking confirmation!",
                    html: `<p> ${objData.firstName} ${objData.lastName}, your booking has been created successfully </p> 
                            <p> Your booking details:  You have a booking: ${humanReadableDateAndTimeStart} which will take: "" hours.</p> 
                            <p> For the service: ${objData.service}  with the stylist: ${objData.stylist} </p> 
                            <p>
                                <strong>Edit your booking:</strong><br>
                                <a href="${bookingEditLink}" target="_blank">${bookingEditLink}</a>
                            </p>
                            <p>
                                <strong>Cancel your booking:</strong><br>
                                <a href="${bookingCancelLink}" target="_blank">${bookingCancelLink}</a>
                            </p>`
                }
                // Anrufen die Funktion, um die Email an den Client zu schicken
                await createEmailAndSend(emailContent);
                return res.json('Buchung wurde erfolgreich bestätigt! - ' + bookingSaved + ' Token - ' + token);
    
            }else {
                return res.json('Booking not found! or not token')
            }
        }else {
            res.status(500).json({ message: 'Session error!' });
        }
    }   catch(error) {
        console.log(error, 'Error found on verify code controller!');
    }
}

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {createBooking, editBookingGet, editBookingPut, cancelBooking, getMyBookings,
    requestCode, verifyCode, notFound}
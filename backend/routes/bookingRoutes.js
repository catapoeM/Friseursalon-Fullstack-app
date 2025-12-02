import express from 'express';
import { getAllBookings, getMyBookings , deleteBooking, visitorCreateBooking, deleteAllBookings, requestCode, verifyCode, notFound } from '../controllers/bookingController.js';
import { body } from 'express-validator';

import { isFutureDate, validatePhoneNumber } from '../validators/bookingValidation.js';
import { checkToken, checkValidation, createVisitorId} from '../common/middlewares.js';

const router = express.Router();

// Get ALL Bookings
router.get('/', getAllBookings);

// Create booking as visitor
router.post('/visitor/create',
    body('firstName')
        .trim()
        .notEmpty()
        .isLength({min: 2, max: 50})
        .withMessage('Vorname muss mindestens 2 und maximum 50 Zeichen lang sein'),
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Nachname darf nicht leer sein')
        .isLength({min: 2, max: 50})
        .withMessage('Nachname muss mindestens 2 und maximum 50 Zeichen lang sein'),
    body('date')
        .notEmpty()
        .withMessage('Datum ist erforderlich')
        .custom(isFutureDate)
        .withMessage('Datum muss in der Zukunft liegen'),
    body('time')
        .notEmpty()
        .withMessage('Uhrzeit ist erforderlich')
        .matches(/^(1[0-8]):00$/)
        .withMessage('Bitte eine gültige Uhrzeit zwischen 10:00 und 18:00 im Format HH:00 angeben (nur ganze Stunden erlaubt).'),
    body('service')
        .notEmpty()
        .withMessage('Service ist erforderlich')
        .isIn(['Haarschnitt', 'Färben', 'Styling', 'Bartpflege'])
        .withMessage('Ungültiger Service'),
    body('phone')
        .notEmpty()
        .withMessage('Telefonnummer ist erforderlich')
        .isMobilePhone()
        .withMessage("Ungültige Telefonnummer (Express)")
        .custom(validatePhoneNumber),
    body('email')
        .notEmpty()
        .withMessage('Telefonnummer ist erforderlich')
        .isEmail()
        .withMessage("Ungültige Email"),
    checkValidation,
    createVisitorId,
    visitorCreateBooking);

// Request code for the visitor to its booking
router.post('/visitor/request-code', createVisitorId, requestCode);

// Verify code for the visitor to its booking
router.post('/visitor/verify-code',
    body('verifyCode')
        .trim()
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid code. Too large or too small number'),
     checkValidation, createVisitorId, verifyCode);

// Get  myBookings as User
router.get('/mybookings', checkToken, getMyBookings);

// Get One booking as visitor
router.get('/mybooking', getMyBookings);

// Delete a booking as User OR ADMIN
router.delete('/mybooking/:id', checkToken, deleteBooking);

// Delete a booking as User OR ADMIN
router.delete('/', checkToken, deleteAllBookings);

router.use('', notFound);

export default router;
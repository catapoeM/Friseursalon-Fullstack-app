import express from 'express';
import { getAllBookings, getMyBookings , deleteBooking, visitorCreateBooking, deleteAllBookings, requestCode, verifyCode, notFound } from '../controllers/bookingController.js';
import { body } from 'express-validator';

import { startAtLeastTwoHoursAhead, startOnValidWeekday, startWithinHours,
    endWithinHours, endNotAfter19, durationValid,
     validatePhoneNumber } from '../validators/bookingValidation.js';
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
    body('start')
        .notEmpty()
        .isISO8601()
        .toDate()
        .withMessage("Start must be a valid date.")
        .custom(startAtLeastTwoHoursAhead)
        .custom(startOnValidWeekday)
        .custom(startWithinHours)
        .withMessage("Start mind. +2 Stunden in Zukunft; Nur Dienstag–Freitag; Arbeitszeit 10–19 Uhr"),
    body('end')
        .notEmpty()
        .isISO8601()
        .toDate()
        .withMessage("End must be a valid date.")
        .custom(endWithinHours)
        .custom(endNotAfter19)
        .custom(durationValid)
        .withMessage("End max. +3 Stunden nach Start; Min. 1 Stunde Termin; Arbeitszeit 10–19 Uhr; End darf 19:00 nicht überschreiten"),
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
        .escape()
        .trim()
        .withMessage('Email ist erforderlich')
        .isEmail()
        .withMessage("Ungültige Email"),
    checkValidation,
    createVisitorId,
    visitorCreateBooking);

// Request code for the visitor to its booking
router.post('/visitor/request-code',
    body('email')
        .escape()
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Ungültige Email"),
        checkValidation, createVisitorId, requestCode);

// Verify code for the visitor to its booking
router.post('/visitor/verify-code',
    body('verifyCode')
        .trim()
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid code. Too large or too small number'),
     checkValidation, createVisitorId, verifyCode);

// Get  myBookings as User
router.get('/mybookings', createVisitorId, getMyBookings);

// Get One booking as visitor
router.get('/mybooking', getMyBookings);

// Delete a booking as User OR ADMIN
router.delete('/mybooking/:id', checkToken, deleteBooking);

// Delete a booking as User OR ADMIN
router.delete('/', checkToken, deleteAllBookings);

router.use('', notFound);

export default router;
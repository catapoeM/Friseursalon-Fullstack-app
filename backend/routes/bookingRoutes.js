import express from 'express';
import { getAllBookings, getMyBookings , deleteBooking, createBooking, notFound } from '../controllers/bookingController.js';
import { body } from 'express-validator';

import { isFutureDate } from '../validators/bookingValidation.js';
import { checkToken, checkValidation } from '../common/middlewares.js';

const router = express.Router();

// Create booking
router.post('/',
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
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('Uhrzeit muss im Format HH:MM (24h) sein'),
    body('service')
        .notEmpty()
        .withMessage('Service ist erforderlich')
        .isIn(['Haarschnitt', 'Färben', 'Styling', 'Bartpflege'])
        .withMessage('Ungültiger Service'),
    body('phone')
        .notEmpty()
        .withMessage('Telefonnummer ist erforderlich')
        .matches(/^\+?[0-9\s\-]{7,15}$/)
        .withMessage('Ungültige Telefonnummer'),
    checkValidation,
    createBooking);

// Get ALL Bookings as ADMIN
router.get('/', checkToken, getAllBookings);

// Get One booking as User
router.get('/:id', checkToken, getMyBookings);

// Delete a booking as User OR ADMIN
router.delete('/:id', checkToken, deleteBooking);

router.use('', notFound);

export default router;
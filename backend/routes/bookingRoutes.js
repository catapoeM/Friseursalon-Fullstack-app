import express from 'express';
import {createBooking, editBookingPut, cancelBooking,
    requestCode, verifyCode, notFound } from '../controllers/bookingController.js';
import { body, param, query } from 'express-validator';

import { startAtLeastTwoHoursAhead, startOnValidWeekday, startWithinHours,
    endWithinHours, endNotAfter19, durationValid,
     validatePhoneNumber } from '../validators/bookingValidation.js';
import { checkValidation, createVisitorId } from '../middlewares/middlewares.js';

const router = express.Router();

// Create booking as visitor
router.post('/create',
    body('firstName')
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 2, max: 50})
        .withMessage('Vorname muss mindestens 2 und maximum 50 Zeichen lang sein'),
    body('lastName')
        .trim()
        .escape()
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
    body('serviceId'),
    body('stylistId'),
    body('clientType')
        .isIn(['Woman', 'Man', 'Child'])
        .withMessage('Ungültiger Client typ'),
    body('phone')
        .isMobilePhone()
        .withMessage("Ungültige Telefonnummer (Express)")
        .custom(validatePhoneNumber),
    body('email')
        .notEmpty()
        .trim()
        .escape()
        .withMessage('Email ist erforderlich')
        .isEmail()
        .withMessage("Ungültige Email"),
    body('clientAdditionalNotes')
        .optional()
        .trim()
        .escape()
        .isString()
        .isLength({min:10, max: 100})
        .withMessage('Mindestens 10 Buchstaben, maximal 100'),
    checkValidation,
    createVisitorId,
    createBooking
);

// Change the booking
router.put('/:id/edit',
    body('start')
        .isISO8601()
        .toDate()
        .withMessage("Start must be a valid date.")
        .custom(startAtLeastTwoHoursAhead)
        .custom(startOnValidWeekday)
        .custom(startWithinHours)
        .withMessage("Start mind. +2 Stunden in Zukunft; Nur Dienstag–Freitag; Arbeitszeit 10–19 Uhr"),
    body('end')
        .isISO8601()
        .toDate()
        .withMessage("End must be a valid date.")
        .custom(endWithinHours)
        .custom(endNotAfter19)
        .custom(durationValid)
        .withMessage("End max. +3 Stunden nach Start; Min. 1 Stunde Termin; Arbeitszeit 10–19 Uhr; End darf 19:00 nicht überschreiten"),
    body('service')
        .isIn(['Haarschnitt', 'Färben', 'Styling', 'Bartpflege'])
        .withMessage('Ungültiger Service'),
    body('stylist')
        .isIn(['Catalina', 'Cristian'])
        .withMessage('Ungültiger Stylist'),   
    body('clientAdditionalNotes')
        .optional()
        .trim()
        .escape()
        .isString()
        .isLength({min:10, max: 100})
        .withMessage('Mindestens 10 Buchstaben, maximal 100'),
    checkValidation,
    createVisitorId,
    editBookingPut
);

// Cancel the booking
router.patch('/:id/cancel',
    param("id")
        .isMongoId(),
    query("code")
        .isString()
        .isLength({min:32, max: 64}),
    body('clientAdditionalNotes')
        .optional()
        .trim()
        .escape()
        .isString()
        .isLength({min:10, max: 100})
        .withMessage('Mindestens 10 Buchstaben, maximal 100'),
    checkValidation,
    createVisitorId,
    cancelBooking
);

// Request code for the visitor to its booking
router.post('/request-code',
        createVisitorId, requestCode);

// Verify code for the visitor to its booking
router.post('/verify-code',
    body('verifyCode')
        .trim()
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid code. Too large or too small number'),
     checkValidation, createVisitorId, verifyCode);

router.use('', notFound);

export default router;
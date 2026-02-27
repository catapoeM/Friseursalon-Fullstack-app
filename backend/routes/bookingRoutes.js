import express from 'express';
import {createBooking, cancelBooking,
    requestCode, verifyCode, notFound } from '../controllers/bookingController.js';
import { body, param, query } from 'express-validator';

import { startAtLeastTwoHoursAhead, startOnValidWeekday, startWithinHours,
    endWithinHours, endNotAfter19, durationValid,
     validatePhoneNumber } from '../validators/bookingValidation.js';
import { checkValidation } from '../middlewares/middlewares.js';

const router = express.Router();

// Create booking as visitor
router.post('/:id/create',
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
    body('date')
        .notEmpty()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('Datum muss im Format YYYY-MM-DD sein')
        .custom(value => {
        const [y, m, d] = value.split('-').map(Number);
        const date = new Date(Date.UTC(y, m - 1, d));
        if (isNaN(date.getTime())) throw new Error('Ungültiges Datum');
            return true;
        }),
    body('startHour')
        .notEmpty()
        .isNumeric({ min: 8, max: 23 })
        .withMessage('startHour muss eine Zahl zwischen 8 und 23 sein'),
    body('endHour')
        .notEmpty()
        .isNumeric({ min: 8, max: 23 })
        .withMessage('startHour muss eine Zahl zwischen 8 und 23 sein')
        .custom((value, { req }) => {
        if (value < req.body.startHour) {
                throw new Error('endHour muss gleich oder größer als startHour sein');
        }
            return true;
        }),
    body('serviceId')
        .isArray({min: 1}),
    body('clientType')
        .isIn(['Mann', 'Frau', 'Kinder'])
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
        .isString(),
    // Confirmed field
    body('confirmed')
        .optional() // not required
        .isBoolean()
        .withMessage('confirmed must be a boolean')
        .toBoolean(), // converts "true"/"false" strings to boolean
    // isCanceled field
    body('isCanceled')
        .optional()
        .isBoolean()
        .withMessage('isCanceled must be a boolean')
        .toBoolean(),
    checkValidation,
    createBooking
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
    cancelBooking
);

// Request code for the visitor to its booking
router.post('/request-code',
        requestCode);

// Verify code for the visitor to its booking
router.patch('/verify-code',
    body('verifyCode')
        .isString()
        .trim()
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid code. Too large or too small number'),
     checkValidation, verifyCode);

router.use('', notFound);

export default router;
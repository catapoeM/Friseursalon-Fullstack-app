import express from 'express';
import {createBooking, editBookingGet, editBookingPut, cancelBooking,
    requestCode, verifyCode, notFound } from '../controllers/bookingController.js';
import { body, param, query } from 'express-validator';

import { startAtLeastTwoHoursAhead, startOnValidWeekday, startWithinHours,
    endWithinHours, endNotAfter19, durationValid,
     validatePhoneNumber } from '../validators/bookingValidation.js';
import { checkValidation, createVisitorId } from '../middlewares/middlewares.js';

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
        .isFloat({ min: 0, max: 23.5 })
        .withMessage('startHour muss eine Zahl zwischen 0 und 23.5 sein')
        .custom(value => value % 0.5 === 0)
        .withMessage('startHour darf nur volle oder halbe Stunden sein'),
    body('endHour')
        .notEmpty()
        .isFloat({ min: 0.5, max: 24 })
        .withMessage('endHour muss eine Zahl zwischen 0.5 und 24 sein')
        .custom(value => value % 0.5 === 0)
        .withMessage('endHour darf nur volle oder halbe Stunden sein')
        .custom((value, { req }) => {
        if (value <= req.body.startHour) throw new Error('endHour muss größer als startHour sein');
            return true;
        }),
    body('serviceId'),
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
    createVisitorId,
    createBooking
);

router.get('/:id/edit',
    editBookingGet
)

// Change the booking
router.put('/:id/edit',
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
        .isFloat({ min: 0, max: 23.5 })
        .withMessage('startHour muss eine Zahl zwischen 0 und 23.5 sein')
        .custom(value => value % 0.5 === 0)
        .withMessage('startHour darf nur volle oder halbe Stunden sein'),
    body('endHour')
        .notEmpty()
        .isFloat({ min: 0.5, max: 24 })
        .withMessage('endHour muss eine Zahl zwischen 0.5 und 24 sein')
        .custom(value => value % 0.5 === 0)
        .withMessage('endHour darf nur volle oder halbe Stunden sein')
        .custom((value, { req }) => {
        if (value <= req.body.startHour) throw new Error('endHour muss größer als startHour sein');
            return true;
        }),
    checkValidation,
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
router.patch('/verify-code',
    body('verifyCode')
        .trim()
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Invalid code. Too large or too small number'),
     checkValidation, createVisitorId, verifyCode);

router.use('', notFound);

export default router;
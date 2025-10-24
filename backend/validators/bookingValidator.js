import { body } from "express-validator";

export const terminValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name darf nicht leer sein')
        .isLength({min: 2, max: 50})
        .withMessage('Name muss mindestens 2 und maximum 50 Zeichen lang sein'),
    body('date')
        .notEmpty()
        .withMessage('Datum ist erforderlich')
        .isISO8601()
        .withMessage('Datum muss im Format YYYY-MM-DD sein'),
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
        .withMessage('Ungültige Telefonnummer')
];
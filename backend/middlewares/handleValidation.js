import { validationResult } from "express-validator";
import {parsePhoneNumberFromString} from 'libphonenumber-js';

export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next();
};

// Vaditate if the phone number is real
export const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, "AT");
    return phoneNumber && phoneNumber.isValid();
};
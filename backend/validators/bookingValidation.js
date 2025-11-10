import { validationResult } from "express-validator";
import {parsePhoneNumberFromString} from 'libphonenumber-js';

// check the req.body for errors;
const validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    // 🧾 Step 2: return them in response
    return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
    });
    }
    next();
}

// Vaditate if the phone number is real
const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, "AT");
    return phoneNumber && phoneNumber.isValid();
};

// Custom helper to check if date is in the future
const isFutureDate = (value) => {
  const today = new Date();
  const selected = new Date(value);
  return selected >= today;
};

export {validation, validatePhoneNumber, isFutureDate};
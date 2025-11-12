import { validationResult, matchedData } from "express-validator";
import {parsePhoneNumberFromString} from 'libphonenumber-js';

// check the req.body for errors;
const checkValidation = (req, res, next) => {
    // Validieren der Parameter
  const result = validationResult(req);

  // Early return pattern, hier beenden
  if (!result.isEmpty()) {
    return res.status(422).send(result.array());
  }

  // Werte aus bereinigten Daten rausholen und in Request-Objekt
  req.matchedData = matchedData(req);

  // in die nächste Middleware weiterschalten
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

export {checkValidation, validatePhoneNumber, isFutureDate};
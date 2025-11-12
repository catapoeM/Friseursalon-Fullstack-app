import {parsePhoneNumberFromString} from 'libphonenumber-js';

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

export {validatePhoneNumber, isFutureDate};
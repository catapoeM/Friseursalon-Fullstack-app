import {parsePhoneNumberFromString} from 'libphonenumber-js';


// Vaditate if the phone number is real
const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone, "AT");
    return phoneNumber && phoneNumber.isValid();
};

export { validatePhoneNumber}
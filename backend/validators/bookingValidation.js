import parsePhoneNumber  from 'libphonenumber-js';

// Vaditate if the phoneNumber number is real
const validatePhoneNumber = (phoneN) => {
  try {
    const phoneNumber = parsePhoneNumber(phoneN, 'AT')
    if (phoneNumber) {
      if (phoneNumber.country === 'AT' && phoneNumber.isPossible()
        && phoneNumber.isValid())
      {
        return phoneNumber.number;
      }
    }
  } catch (error) {
      console.error('Invalid phone number:', error.message)
  }
  
};

// Custom helper to check if date is in the future
const isFutureDate = (value) => {
  const today = new Date();
  const selected = new Date(value);
  return selected >= today;
};

export {validatePhoneNumber, isFutureDate};
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

//  Helpers validators
function isTuesdayToFriday(date) {
  const day = date.getDay(); 
  return day >= 2 && day <= 5; // Tue–Fri
}

function isWithinOpeningHours(date) {
  const hour = date.getHours();
  return hour >= 10 && hour < 19; // 10:00 – 18:59
}

// Validators
const startAtLeastTwoHoursAhead = (start) => {
  const nowPlus2h = new Date(Date.now() + 2 * 60 * 60 * 1000);
  if (start < nowPlus2h) {
    throw new Error("Start must be at least 2 hours in the future.");
  }
  return true;
};

const startOnValidWeekday = (start) => {
  if (!isTuesdayToFriday(start)) {
    throw new Error("Start must be between Tuesday and Friday.");
  }
  return true;
};

const startWithinHours = (start) => {
  if (!isWithinOpeningHours(start)) {
    throw new Error("Start must be between 10:00 and 19:00.");
  }
  return true;
};

const endWithinHours = (end) => {
  if (!isWithinOpeningHours(end)) {
    throw new Error("End must be between 10:00 and 19:00.");
  }
  return true;
};

const durationValid = (value, { req }) => {
  const start = req.body.start;
  const end = req.body.end;

  const diffMs = end - start;
  const diffHours = diffMs / 1000 / 60 / 60;

  if (diffHours < 1) {
    throw new Error("Appointment must be at least 1 hour.");
  }
  if (diffHours > 3) {
    throw new Error("Appointment cannot be longer than 3 hours.");
  }
  return true;
};

const endNotAfter19 = (end) => {
  const latestEnd = new Date(end);
  latestEnd.setHours(19, 0, 0, 0); // 19:00 cutoff

  if (end > latestEnd) {
    throw new Error("Appointment may not go past 19:00.");
  }
  return true;
};

export {validatePhoneNumber, startAtLeastTwoHoursAhead, startOnValidWeekday, startWithinHours,
    endWithinHours, endNotAfter19, durationValid};
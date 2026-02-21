import { Bookings } from "../models/bookingModel.js";

const bookingExists = async(stylistId, date, startHour, endHour) => {
    const conflict = await Bookings.findOne({
        stylistId: stylistId,
        date: date,
        $or: [
            // existing booking starts inside the desired range
            { startHour: { $gte: startHour, $lt: endHour } },
            // existing booking ends inside the desired range
            { endHour: { $gt: startHour, $lte: endHour } },
            // existing booking fully covers the desired range
            { startHour: { $lte: startHour }, endHour: { $gte: endHour } }
        ]
    });
    console.log(conflict, ' confl')
    if (conflict) {
        return true
    }return false;
}

export {bookingExists}

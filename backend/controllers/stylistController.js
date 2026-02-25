import Stylist from '../models/stylistModel.js'
import { Bookings } from '../models/bookingModel.js';

const getStylistsWithServices = async (req, res) => {
    try {
        const stylists = await Stylist.find({ isActive: true });
        res.json(stylists);
    }   catch(error) {
        res.status(500).json({ error: "Failed to fetch stylists" });
    }
} 

const getStylistBookings = async (req, res) => {
    try {
        const {id} = req.params;

        const stylistActive = await Stylist.findOne({
            _id: id,
            isActive: true
        })

        if (!stylistActive) {
            return res.status(500).json({ error: "Stylist inactive" });
        }
        const stylistBookings = await Bookings.find({ 
            stylistId: id,
            isCanceled: false
        });
        if (!stylistBookings) {
            return res.status(500).json({ error: "Failed to fetch the services of the stylist" });
        }
        res.status(200).json(stylistBookings);
    }   catch(error) {
        res.status(500).json({ error: "Failed to fetch stylists" });
    }
}

export {getStylistsWithServices, getStylistBookings}
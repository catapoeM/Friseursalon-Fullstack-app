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

const getAvailability = async (req, res) => {
    
}

export {getStylistsWithServices, getAvailability}
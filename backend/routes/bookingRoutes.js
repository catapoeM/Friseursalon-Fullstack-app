import express from 'express';
import { getBooking, postBooking } from '../controllers/booking.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/termin', getBooking);

router.post('/termin', 
    body('name').escape().trim().isLength({min: 2, max: 50}),
    body('date').escape(),     postBooking);

export default router;
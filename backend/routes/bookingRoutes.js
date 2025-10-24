import express from 'express';
import { getBooking, postBooking, notFound } from '../controllers/booking.js';
import { terminValidator } from '../validators/bookingValidator.js';
import { handleValidation } from '../middlewares/handleValidation.js';

const router = express.Router();

router.get('/', getBooking);

router.post('/', terminValidator, handleValidation, postBooking);

router.use('', notFound);

export default router;
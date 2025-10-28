import express from 'express';
import { getBookings, notFound } from '../controllers/bookingController.js';
import { terminValidator } from '../validators/bookingValidator.js';
import { handleValidation } from '../middlewares/handleValidation.js';

const router = express.Router();

router.get('/', getBookings);

//router.post('/', terminValidator, handleValidation, postBooking);

router.use('', notFound);

export default router;
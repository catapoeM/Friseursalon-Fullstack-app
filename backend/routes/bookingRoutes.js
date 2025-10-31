import express from 'express';
import { getBookings, notFound } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', getBookings);

router.use('', notFound);

export default router;
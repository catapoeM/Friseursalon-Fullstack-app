import express from 'express';
import { getStylistsWithServices, getStylistBookings } from '../controllers/stylistController.js';

const router = express.Router();

router.get('/', getStylistsWithServices);

router.get('/:id', getStylistBookings)

export default router;
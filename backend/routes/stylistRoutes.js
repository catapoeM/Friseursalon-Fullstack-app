import express from 'express';
import { getStylistsWithServices, getAvailability } from '../controllers/stylistController.js';

const router = express.Router();

router.get('/', getStylistsWithServices);

router.get('/:stylistId/availability', getAvailability)

export default router;
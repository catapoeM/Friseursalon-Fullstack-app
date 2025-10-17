import express from 'express';
import { getHome, postHome } from '../controllers/home.js';

const router = express.Router();

router.get('/api', getHome);
router.post('/', postHome);

export default router;
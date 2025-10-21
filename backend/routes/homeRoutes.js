import express from 'express';
import { getHome, postHome, notFound } from '../controllers/home.js';

const router = express.Router();

router.get('/', getHome);

router.post('/', postHome);

router.use('', notFound);

export default router;
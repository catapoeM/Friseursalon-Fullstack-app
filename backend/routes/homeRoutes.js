import express from 'express';
import { getHome, postHome, notFound } from '../controllers/homeController.js';
import { createVisitorId } from '../common/middlewares.js';
const router = express.Router();

router.get('/', createVisitorId, getHome);

router.post('/', postHome);

router.use('', notFound);

export default router;
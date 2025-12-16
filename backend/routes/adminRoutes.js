import express from 'express';
import { notFound, adminLogin } from '../controllers/adminController.js';
import { checkValidation } from '../common/middlewares.js';
import { body} from 'express-validator';

const router = express.Router();

// Login as User or Admin
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString().isLength({ min: 8, max: 50 }),
  checkValidation,
  adminLogin
);


router.use('', notFound);

export default router;
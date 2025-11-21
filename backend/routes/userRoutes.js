import express from 'express';
import { loginUser, createUser, getAllUsers, deleteAllUsers, notFound } from '../controllers/userController.js';
import { checkToken, checkValidation } from '../common/middlewares.js';
import { body } from 'express-validator';
import { validatePhoneNumber } from '../validators/bookingValidation.js';

const router = express.Router();

  // Create User or Admin
router.post(
  '/signin',
  body('firstName').escape().trim().isLength({ min: 2, max: 50 }),
  body('lastName').escape().trim().isLength({ min: 2, max: 50 }),
  body('password').isLength({ min: 8, max: 50 }),
  body('email').escape().trim().isEmail(),
  body('phone')
  .trim()
  .notEmpty()
  .withMessage('Telefonnummer ist erforderlich')
  .custom(validatePhoneNumber),
  body('admin').isBoolean(),
  
  checkValidation,
  createUser
);

// Login as User or Admin
router.post(
  '/login',
  body('login').escape().trim().isLength({ min: 4, max: 50 }),
  body('password').isLength({ min: 8, max: 50 }),
  checkValidation,
  loginUser
);

router.get('/', checkToken, getAllUsers);

router.delete('/', checkToken, deleteAllUsers);

router.use('', notFound);

export default router;
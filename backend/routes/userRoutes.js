import express from 'express';
import { loginUser, createUser, notFound } from '../controllers/userController.js';
import { checkToken, checkValidation } from '../common/middlewares.js';
import { body } from 'express-validator';

const router = express.Router();

  // Create User or Admin
router.post(
  '/signin',
  body('email').escape().trim().isEmail(),
  body('firstName').escape().trim().isLength({ min: 2, max: 50 }),
  body('lastName').escape().trim().isLength({ min: 2, max: 50 }),
  body('password').isLength({ min: 8, max: 50 }),
  body('admin').isBoolean(),
  body('phone')
        .trim()
        .notEmpty()
        .withMessage('Telefonnummer ist erforderlich')
        .matches(/^\+?[0-9\s\-]{7,15}$/)
        .withMessage('Ungültige Telefonnummer'),
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

router.use('', notFound);

export default router;
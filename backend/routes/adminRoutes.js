import express from 'express';
import { notFound, adminRegister, adminLogin, createStylist, addServiceToStylist, getStylists } from '../controllers/adminController.js';
import { checkToken, checkValidation } from '../common/middlewares.js';
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

router.post(
  '/register',
  body('email').notEmpty().isEmail(),
  body('password').notEmpty().isString().isLength({min: 8, max: 50})
    .withMessage("Password must be between 8 and 50 characters")
    .trim(),
  body('predefinedSecretKey').notEmpty(),
  checkValidation,
  adminRegister
)

router.post("/stylist", checkToken, createStylist);

router.post("/stylist/:id/services", checkToken, addServiceToStylist);

router.get("/stylists", checkToken, getStylists)

router.use('', notFound);

export default router;
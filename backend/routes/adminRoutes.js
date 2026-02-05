import express from 'express';
import { notFound, adminRegister, adminLogin, createStylist, updateStylist, addServiceToStylist, getStylists, updateServiceToStylist, deleteServiceFromStylist } from '../controllers/adminController.js';
import { checkToken, checkValidation } from '../middlewares/middlewares.js';
import { adminRegisterLimiter, loginLimiter } from '../middlewares/rateLimit.js';
import { body, check} from 'express-validator';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  body('email').notEmpty().isEmail(),
  body('password').notEmpty().isString().isLength({min: 8, max: 50})
    .withMessage("Password must be between 8 and 50 characters")
    .trim(),
  body('confirmPassword').notEmpty().isString().isLength({min: 8, max: 50})
    .withMessage("Password must be the same on both sections: 'Password and Repeat Password' ")
    .trim(),
  body('adminSecret').notEmpty(),
  adminRegisterLimiter,
  checkValidation,
  adminRegister
)

// Login as User or Admin
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString().isLength({ min: 8, max: 50 }),
  loginLimiter,
  checkValidation,
  adminLogin
);

router.post(
  "/stylist", checkToken, upload.single('photo'),
  body("name")
    .trim()
    .exists().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-ZäöüÄÖÜß\s'-]+$/)
    .withMessage("Name contains invalid characters"),
  body("bio")
    .trim()
    .notEmpty()
    .isLength({min: 10, max: 250})
    .withMessage("Biography must be between 10 and 250 characters"),
  createStylist);

router.patch("/stylist/:id", checkToken,
  body("isActive")
    .isBoolean(),
  updateStylist)

router.post("/stylist/:id/services", checkToken, 
  body("serviceName")
    .exists()
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 }),
  body("duration")
    .exists()
    .isInt({ min: 1, max: 5 })
    .withMessage("Duration must be between 1 and 5 Hours"),
  body("price")
    .exists()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("clientType")
    .exists()
    .isIn(["Woman", "Man", "Child"])
    .withMessage("Invalid client type"),
  addServiceToStylist);

router.put("/stylist/:stylistId/services/:serviceId", checkToken, 
  body("serviceName")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 }),
  body("duration")
    .optional()
    .isInt({ min: 1, max: 5 }),
  body("price")
    .optional()
    .isFloat({ min: 0 }),
  body("clientType")
    .optional()
    .isIn(["Woman", "Man", "Child"]),
  updateServiceToStylist)

router.delete("/stylist/:stylistId/services/:serviceId",
  checkToken, deleteServiceFromStylist);


router.get("/stylists", checkToken, getStylists)

router.use('', notFound);

export default router;
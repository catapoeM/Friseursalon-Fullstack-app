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

// Login as Admin
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
    .exists().withMessage("Service Name is required")
    .isString()
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage("Service Name must be between 3 and 40 Characters"),
  body("duration")
    .exists().withMessage("Duration is required")
    .isInt({ min: 15, max: 240 })
    .withMessage("Duration must be between 15 and 240 Minutes"),
  body("price")
    .exists().withMessage("Price is required")
    .isInt({ min: 10})
    .withMessage("Price must be minimum of 10"),
  body("clientType")
    .exists().withMessage("Client type is required")
    .isString()
    .trim()
    .isIn(["Woman", "Man", "Child"])
    .withMessage("Invalid client type. Must be either (Woman / Man / Child"),
  addServiceToStylist);

router.put("/stylist/:stylistId/services/:serviceId", checkToken, 
  body("serviceName")
    .exists().withMessage("Service Name is required")
    .isString()
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage("Service Name must be between 3 and 40 Characters"),
  body("duration")
    .exists().withMessage("Duration is required")
    .isInt({ min: 15, max: 240 })
    .withMessage("Duration must be between 15 and 240 Minutes"),
  body("price")
    .exists()
    .isInt({ min: 10})
    .withMessage("Price must be minimum of 10"),
  body("clientType")
    .exists().withMessage("Client type is required")
    .isString()
    .trim()
    .isIn(["Woman", "Man", "Child"])
    .withMessage("Invalid client type. Must be either (Woman / Man / Child"),
  updateServiceToStylist)

router.delete("/stylist/:stylistId/services/:serviceId",
  checkToken, deleteServiceFromStylist);


router.get("/stylists", checkToken, getStylists)

router.use('', notFound);

export default router;
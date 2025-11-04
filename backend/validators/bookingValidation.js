import { validationResult } from "express-validator";

// check the req.body for errors;
const validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    // 🧾 Step 2: return them in response
    return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
    });
    }
    next();
}

export {validation};
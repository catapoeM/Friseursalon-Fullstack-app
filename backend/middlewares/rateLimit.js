import rateLimit from 'express-rate-limit';

const adminRegisterLimiter = rateLimit ({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 50, // max. 50 Versuche
    standardHeaders: true,
    legacyHeaders: false,
    message: {error: "Too many attempts, try again later!"}
});

const loginLimiter = rateLimit ({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 10, // max. 10 Versuche
    standardHeaders: true,
    legacyHeaders: false,
    message: {error: "Too many attempts, try again later!"}
});

export {adminRegisterLimiter, loginLimiter} ;
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js';
import { Bookings, VisitorVerification } from '../models/bookingModel.js';
import { getToken } from './index.js';
import { validationResult, matchedData } from "express-validator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// check the req.body for errors;
const checkValidation = (req, res, next) => {
    // Validieren der Parameter
  const result = validationResult(req);

  // Early return pattern, hier beenden
  if (!result.isEmpty()) {
    return res.status(422).send(result.array());
  }

  // Werte aus bereinigten Daten rausholen und in Request-Objekt
  req.matchedData = matchedData(req);

  // in die nächste Middleware weiterschalten
  next();
}

const checkToken = async (req, res, next) => {
  // wenn ein Browser ein sog. "Preflight" (Anfrage, ob der Browser)
  // bestimmte Sachen machen darf) sendet, kommt dieser als HTTP-Methode
  // OPTIONS. Muss durchgelassen werden
  if (req.method === 'OPTIONS') {
    return next();
  }

  // Token vom Header einlesen
  const { authorization } = req.headers;
  console.log(authorization.token, ' auth')
  if (!authorization || authorization.length < 10) {
    return res.status(401).send('Invalid token');
  }

  // Token aus 'authorization' rausholen
  const token = authorization.split(' ')[1];
  console.log(token, ' token')

  // Token prüfen auf Gültigkeit und Ablauf
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // ID des Users aus Token decodieren
  const { id } = decoded;

  const foundUser = await User.findById(id);
  if (!foundUser) {
    return res.status(401).send('Invalid token1');
  }

  // gefundenen Bookings in das request-Objekt schreiben
  req.verifiedBooking = foundUser;

  // bei erfolgreicher Prüfung in die nächste Middleware weiterschalten
  next();
};

const requestCode = async (req, res) => {
  const email = req.body.email;
  console.log(email, ' email')
  const code = Math.floor(100000 + Math.random() * 900000);

  await VisitorVerification.findOneAndUpdate(
    { email },
    {
      email,
      code: code,
      expiresAt: Date.now() + 1000 * 60 * 10 // 10 min
    },
    {upsert: true}
  );
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
  });

  await transporter.sendMail({
    from: '"Test" <test@example.com>',
    to: process.env.NODEMAILER_USER,
    subject: "Your verification code",
    text: `Code: ${code}. Valid for 10 minutes.`
  });

  res.json({message: "Code sent"});
}

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  const entry = await VisitorVerification.findOne({email})

  if (!entry) {
    return res.status(400).json({error: "No code requested"});
  }
  if (entry.code !== code) {
    return res.status(400).json({error: "Invalid code"});
  }
  if (entry.expiresAt < Date.now()) {
    return res.status(400).json({error: "Code expired"});
  }

  // Token erzeugen mit ID des Members
  const token = getToken({email}, process.env.VISITOR_SECRET, '10m');

  res.json({verified: true, token});
}

export {checkToken, checkValidation, requestCode, verifyCode};
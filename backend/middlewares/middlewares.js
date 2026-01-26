import jwt from 'jsonwebtoken';
import { validationResult, matchedData } from "express-validator";
import {Admin} from '../models/adminModel.js';
import Stylist from '../models/stylistModel.js';
import dotenv from "dotenv";
import crypto from 'crypto';

dotenv.config();

const createVisitorId = (req, res, next) => {
  if (!req.session.visitorId) {
        req.session.visitorId = crypto.randomUUID();
  }
  return next();
}

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
  if (!authorization || authorization.length < 10) {
    return res.status(401).send('Invalid token');
  }

  // Token aus 'authorization' rausholen
  const token = authorization.split(' ')[1];

  // Token prüfen auf Gültigkeit und Ablauf
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // ID des Users aus Token decodieren
  const { id } = decoded;

  const admin = await Admin.findById(id);
  const stylist = await Stylist.findById(id);

  if (!admin) {
    return res.status(401).send('Invalid token1');
  }

  // gefundenen Bookings in das request-Objekt schreiben
  req.verifiedBooking = admin;

  // bei erfolgreicher Prüfung in die nächste Middleware weiterschalten
  next();
};

export { checkToken, checkValidation, createVisitorId};
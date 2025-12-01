import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js';
import { validationResult, matchedData } from "express-validator";
import dotenv from "dotenv";
import session from 'express-session';
import { app } from '../server.js';

dotenv.config();

const sessionFunction = () => {
  var sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 15 } // 15 minutes
  }
  
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  app.use(session(sess));
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


export {checkToken, checkValidation, sessionFunction};
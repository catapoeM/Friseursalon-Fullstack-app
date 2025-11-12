import jwt from 'jsonwebtoken';
import Booking, {booking} from '../models/bookingModel';


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
  const decoded = jwt.verify(token, process.env.jwt_secret);

  // ID des Users aus Token decodieren
  const { id } = decoded;

  // Booking über die ID suchen
  const foundBooking = await Booking.findById(id);

  if (!foundBooking) {
    return res.status(401).send('Invalid token');
  }

  // gefundenen Booking in das request-Objekt schreiben
  req.verifiedBooking = foundBooking;

  // bei erfolgreicher Prüfung in die nächste Middleware weiterschalten
  next();
};

export {checkToken};
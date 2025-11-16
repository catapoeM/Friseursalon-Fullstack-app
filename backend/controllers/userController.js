import mongoose from "mongoose";
import {User, Password} from "../models/userModel.js";
import {getHash} from '../common/index.js';

const createUser = async (req, res) => {
    
    // Session für Transaktion aufbauen
    const session = await mongoose.startSession();
    session.startTransaction();

    // Objekt mit den neuen Daten erstellen
    const data = req.matchedData;

    // Objekt in User-Model speichern
    const createdUser = new User(data);
    const newUser = await createdUser.save({session});
    
    // Neue ID auslesen
    const user = newUser._id;
    // Objekt mit ID und Passwort erstellen
    const password = getHash(data.password);
    // Objekt in Password-Model speichern
    const createdPassword = new Password({user, password});
    await createdPassword.save({session});

    await session.commitTransaction();
    // Daten nach Speicherung  ausgeben
    res.status(201).json(newUser);
};

const loginUser = async (req, res) => {
    const {login, password} = req.matchedData;
    
    // User suchen über Email-Adresse ODER Nickname
    const foundUser = await User.findOne({
        $or: [{nickname: login}, {email: login}]
    });

    if (!foundUser) {
        return res.status(401).send('Incorrect login or password ...')
    }

    // Passwort überprüfen
    const foundPassword = await Password.findOne({
        User: foundUser._id
    });
    if (!foundPassword) {
        return res.status(401).send('Incorrect login or password ...')
    }
    if (!checkHash(password, foundPassword.password)) {
        return res.status(401).send('Incorrect login or password ...')
    }

    // Token erzeugen mit ID des Members
    const token = getToken({id: foundUser._id});
    // Token an der Client senden
    return res.send(token);
}

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {createUser, loginUser, notFound}
import mongoose from "mongoose";
import {User, Password} from "../models/userModel.js";
import {getHash, checkHash, getToken} from '../common/index.js';

const createUser = async (req, res) => {
    
    // Session für Transaktion aufbauen
    const session = await mongoose.startSession();
    session.startTransaction();

    // Objekt mit den neuen Daten erstellen
    const data = req.matchedData;

    // Objekt in User-Model speichern
    const createdUser = new User(data);
    
    // Neue ID auslesen
    const newUser = createdUser._id;
    // Objekt mit ID und Passwort erstellen
    const password = getHash(data.password);
    // Objekt in Password-Model speichern
    new Password({newUser, password});
    // Daten nach Speicherung  ausgeben
    res.status(201).json(newUser);
};

const loginUser = async (req, res) => {
    const {login, password} = req.matchedData;
    
    // User suchen über Email-Adresse ODER Nickname
    const foundUser = await User.findOne({
        $or: [{phone: login}, {email: login}]
    });

    if (!foundUser) {
        return res.status(401).send('Incorrect login or password ...')
    }

    // Passwort überprüfen
    const foundPassword = await Password.findOne({
        User: foundUser._id
    });
    console.log('was ist newUser', foundUser)
    console.log('was ist password', foundPassword)
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
import mongoose from "mongoose";
import {User, Password} from "../models/userModel.js";
import {getHash, checkHash, getToken} from '../common/index.js';
import dotenv from 'dotenv';

dotenv.config();

const createUser = async (req, res) => {
    try {
        // Objekt mit den neuen Daten erstellen
        const data = req.matchedData;
        const existing = await User.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });
        console.log(existing, ' existing')
        if (existing) {
        return res.status(400).json({ message: "Email oder Telefon existiert bereits" });
        }
        // Session für Transaktion aufbauen
        const session = await mongoose.startSession();
        session.startTransaction();
    
        // Objekt in Member-Model speichern
        const createdUser = new User(data);
        const newUser = await createdUser.save({ session });
        
        // Neue ID auslesen
        const user = newUser._id;
        // Password hashen
        const password = getHash(data.password);
    
        // Passwoert-Objekt in Password-Model speichern
        const createdPassword = new Password({ user, password });
        await createdPassword.save({ session });
    
        // Transaktion commiten, erst hier wird physisch in die MongoDB geschrieben
        await session.commitTransaction();
    
        // Daten nach Speicherung  ausgeben
        res.status(201).json(newUser);

    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({message: `${field} ist bereits vergeben.`})
        }
        res.status(500).json({ message: err.message });
    }

    
    
};

const loginUser = async (req, res) => {
    const {login, password} = req.matchedData;
    console.log(login)
    // User suchen über Email-Adresse ODER Nickname
    const foundUser = await User.findOne({
        $or: [{ phone: login }, { email: login }],
    });
    if (!foundUser) {
        return res.status(401).send('Incorrect login or password ...')
    }

    // Passwort überprüfen
    const foundPassword = await Password.findOne({user: foundUser._id});

    if (!foundPassword) {
        return res.status(401).send('Incorrect login or password ...')
    }
    if (!checkHash(password, foundPassword.password)) {
        return res.status(401).send('Incorrect login or password ...')
    }

    // Token erzeugen mit ID des Members
    const token = getToken({id: foundUser._id}, process.env.JWT_SECRET, '1h');
    // Token an der Client senden
    return res.send(token);
}

const getAllUsers = async (req, res) => {
  const usersList = await User.find({});
  res.json(usersList);
};

const deleteAllUsers = async (req, res) => {
    try {
        const findDocuments = await User.find({});
        if (findDocuments) {
            await User.deleteMany({});
            return res.send('Database User DELETED')
        }
    } catch (error) {
        res.send(error, ' Error')
    }
};

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {createUser, loginUser, getAllUsers, deleteAllUsers, notFound}
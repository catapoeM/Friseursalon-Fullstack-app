import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js';
import random from 'random';

dotenv.config();

const randomNumber = () => {
   return random.int(100000, 999999).toString();
}

const getToken = (data, secret, expiresTime) => {
    return jwt.sign(data, secret, { expiresIn: expiresTime });
};

const getHash = (plainText) => {
    return bcrypt.hashSync(plainText, 10);
};

const checkHash = (plainText, hash) => {
    return bcrypt.compareSync(plainText, hash);
};

// Function to encrypt an object
const encryptObject = (obj) => {
    const jsonString = JSON.stringify(obj);
    const encryptedObj = CryptoJS.AES.encrypt(jsonString, process.env.CRYPTOJS_SECRET).toString();
    return encryptedObj;
}

// Function to decrypt to an object
const decryptObject = (encryptedObj) => {
    const bytes = CryptoJS.AES.decrypt(encryptedObj, process.env.CRYPTOJS_SECRET);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
}



const createEmailAndSend = async (emailContent) => {
    try {
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
    
        const emailSent = await transporter.sendMail(emailContent);
        
        console.log(emailSent, ' emailContent sent');
        return true;
    }catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const fromStringToDatePlusExtraHours = (stringDate, extraHours) => {
    // In Date umwandeln
    let date = new Date(stringDate );
    // 24 Stunden hinzufügen
    date.setHours(date.getHours() + extraHours);
    // zurück zu ISO-String
    const newDateWithExtraHours = date.toISOString();
    return newDateWithExtraHours;
}

export {getToken, getHash, checkHash, createEmailAndSend, fromStringToDatePlusExtraHours, encryptObject, decryptObject, randomNumber};
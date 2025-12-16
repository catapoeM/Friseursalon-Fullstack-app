import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js';
import random from 'random';
import crypto from 'crypto';

dotenv.config();

const cryptTheCode = (rawCode) => {
    rawCode = crypto.randomBytes(32).toString("hex");
    return rawCode;
} 

const randomNumber = () => {
   return random.int(100000, 999999).toString();
}

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

const formatDateTimeUTC = (isoString, locale) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false
  }).format(new Date(isoString));
}
/*
const calculateTheDifferenceTimeInHours = (firstDate, secondDate) => {
    // difference in milliseconds
    const diffMs = secondDate - firstDate;
    // convert to hours
    const diffHours = diffMs / (1000 * 60 * 60);
    console.log(diffHours, ' diff H')
    return diffHours;
}
*/

export { getHash, checkHash, cryptTheCode, createEmailAndSend, fromStringToDatePlusExtraHours, encryptObject, decryptObject, randomNumber, formatDateTimeUTC};
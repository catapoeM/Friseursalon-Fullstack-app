import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js';
import random from 'random';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();

// Crypt the code 
const cryptTheCode = (rawCode) => {
    rawCode = crypto.randomBytes(32).toString("hex");
    return rawCode;
} 

// Returns a random number of 6 digits between 100000 and 999999
const randomNumber = () => {
   return random.int(100000, 999999).toString();
}

// Hashed the plainText using bcrypt
const getHash = (plainText) => {
    return bcrypt.hashSync(plainText, 10);
};

// Checks and compares the plain text with the one hashed before (F.e. using the function getHash)
const checkHash = (plainText, hash) => {
    return bcrypt.compareSync(plainText, hash);
};

// Gets (creates) a Json web token
const getToken = (data, secret, expiresTime) => {
    return jwt.sign(data, secret, { expiresIn: expiresTime });
};

// Creates the email using (nodemailer) and sends it
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
        if (emailSent) {
            return true;
        }return false;
    }catch (err) {
        return res.status(500).json({message: err.message});
    }
}

    // It takes a list of IDs and a list of service objects
    // Finds which services match those IDs
    // Returns only the service names of the matching ones
const getServiceNamesByIds = (ids, services) => {
    const idSet = new Set(ids.map(id => id.toString()));

    const matchedServices = services
    .filter(service => idSet.has(service._id.toString()))
    .map(service => service.serviceName)
    return matchedServices;
}

export { getHash, checkHash, cryptTheCode, createEmailAndSend, randomNumber, getToken, getServiceNamesByIds};
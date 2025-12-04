import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

dotenv.config();

const getToken = (data, secret, expiresTime) => {
    return jwt.sign(data, secret, { expiresIn: expiresTime });
};

const getHash = (plainText) => {
    return bcrypt.hashSync(plainText, 10);
};

const checkHash = (plainText, hash) => {
    return bcrypt.compareSync(plainText, hash);
};

const createEmailAndSend = async (code) => {
    try {
        const transporter = await nodemailer.createTransport({
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
    
        const emailSent = await transporter.sendMail({
            from: '"Test" <test@example.com>',
            to: process.env.NODEMAILER_USER,
            subject: "Your verification code",
            text: `Code: ${code}. Valid for 5 minutes.`
        });
        
        console.log(emailSent, ' email sent');
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

export {getToken, getHash, checkHash, createEmailAndSend, fromStringToDatePlusExtraHours};
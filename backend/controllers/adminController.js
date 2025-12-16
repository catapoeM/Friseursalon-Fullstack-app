import mongoose from "mongoose";
import {Admin} from "../models/adminModel.js";
import {getHash, checkHash} from '../common/index.js';
import {getToken} from '../common/middlewares.js';
import { body, param, query } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config();

const adminLogin = async (req, res) => {
    const {email, password} = req.body;

    const admin = await Admin.findOne({email});
    if (!admin) {
        return res.status(401).json({error: "Invalid credentials"})
    }

    const match = checkHash(password, admin.password) 
    if(!match) {
        return res.status(401).json({ error: "Invalid credentials"})
    }

    const token = getToken({adminId: admin._id}, process.env.JWT_SECRET, '1h')
    
    res.send(token)
}

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {adminLogin, notFound}
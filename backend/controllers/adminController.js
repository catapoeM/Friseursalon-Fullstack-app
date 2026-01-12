import {Admin, Stylist} from "../models/adminModel.js";
import {getHash, checkHash} from '../common/index.js';
import {getToken} from '../common/middlewares.js';
import dotenv from 'dotenv';

dotenv.config();

const adminRegister = async (req, res) => {
    try {
        const {email, password, predefinedSecretKey} = req.matchedData;
    
        if (predefinedSecretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ error: "Invalid admin secret" });
        }
    
        const existing = await Admin.findOne({});
        if (existing) {
            return res.status(409).json({error: "Admin already exists"});
        }
    
        const passwordHash = getHash(password);
        const admin = await Admin.create({email, password: passwordHash })
    
        res.json({success: true, id: admin._id})

    }   catch (err) {
            res.status(500).json({ error: "Failed to register admin " + err });
    }
    
}

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
    
        const admin = await Admin.findOne({email});
        if (!admin) {
            return res.status(401).json({error: "Invalid credentials"})
        }
    
        const match = checkHash(password, admin.password) 
        if(!match) {
            return res.status(401).json({ error: "Invalid credentials"})
        }
    
        const token = getToken({id: admin._id}, process.env.JWT_SECRET, '1h')
        
        res.send(token)

    }   catch (err) {
            res.status(500).json({ error: "Failed to login " + err });
    }
}


const createStylist = async (req, res) => {
    try {
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({ error: "Stylist name is required" });
        }

    const stylist = await Stylist.create({ name });
    res.status(201).json(stylist);

    }   catch (err) {
            res.status(500).json({ error: "Failed to create stylist " + err});
    }
}

// For now only the status of the stylist can be changed here: Activated/Deactivated : True/False
const updateStylist = async (req, res) => {
    try {
        const {id} = req.params;
        const {isActive} = req.body;

        const stylist = await Stylist.findById(id);
        if (!stylist) {
            return res.status(404).json({error: "Stylist not found!"})
        }

        stylist.isActive = isActive;
        await stylist.save();

        res.json({
            message: "Stylist updated",
            isActive: stylist.isActive
        });

    }   catch (err) {
            res.status(500).json({ error: "Failed to Delete stylist " + err});
    }
}

const addServiceToStylist = async (req, res) => {
    try {
        const { id } = req.params;
        const { serviceName, duration, price, clientType } = req.body;
    
        if (!serviceName || !duration || !price || !clientType) {
          return res.status(400).json({ error: "Missing service fields" });
        }
    
        const stylist = await Stylist.findById(id);
        if (!stylist) {
          return res.status(404).json({ error: "Stylist not found" });
        }
    
        stylist.services.push({ serviceName, duration, price, clientType });
        await stylist.save();
    
        res.json(stylist);

    }   catch (err) {
            res.status(500).json({ error: "Failed to create stylist " + err})
    }
}

const updateServiceToStylist = async (req, res) => {
    try {
        const { stylistId, serviceId } = req.params;
        const { serviceName, duration, price, clientType } = req.body;
        const stylist = await Stylist.findById(stylistId);
        console.log(stylistId)
        console.log(serviceId)
        if (!stylist) {
          return res.status(404).json({ error: "Stylist not found" });
        }
        
        const service = stylist.services.id(serviceId);
        if (!stylist) {
          return res.status(404).json({ error: "Service not found" });
        }
        
        // Update only provided fields
        if (serviceName !== undefined) {
            service.serviceName = serviceName;
        }
        if (duration !== undefined) {
            service.duration = duration; 
        }
        if (price !== undefined) {
            service.price = price;
        }
        if (clientType !== undefined) {
            service.clientType = clientType;
        }
        await stylist.save();
        
        res.json(service);

    }   catch (err) {
            res.status(500).json({ error: "Failed to update service for stylist " + err})
    }
}

const getStylists = async (req, res) => {
    try {
        const stylists = await Stylist.find();
        res.json(stylists);
    }   catch (err) {
        res.status(500).json({ error: "Failed to fetch stylists" + err });
    }
}

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {adminLogin, adminRegister, createStylist, updateStylist, addServiceToStylist, updateServiceToStylist, getStylists, notFound}
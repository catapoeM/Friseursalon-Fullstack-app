import {Admin} from "../models/adminModel.js";
import Stylist from "../models/stylistModel.js";
import {getHash, checkHash} from '../common/index.js';
import {getToken} from '../common/index.js';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const adminRegister = async (req, res) => {
    try {
        const {email, password, confirmPassword, adminSecret} = req.matchedData;
    
        if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ error: "Invalid admin secret" });
        }
    
        const existing = await Admin.findOne({});
        if (existing) {
            return res.status(409).json({error: "Admin already exists"});
        }
        if (password === confirmPassword) {
            const passwordHash = getHash(password);
            const admin = await Admin.create({email, password: passwordHash })
        
            res.json({success: true, id: admin._id})
        } else {
            return res.status(403).json({error: "Password and Confirm Password must be the same"});
        }

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
        const {name, bio} = req.body;
        
        let photoUrl = null;
        
        if (!name || !bio) {
            return res.status(400).json({ error: "Stylist name and bio are required" });
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'stylists',
                transformation: [{width: 600, crop: 'scale'}]
            })
            photoUrl = result.secure_url;
        }

    const stylist = await Stylist.create({
        name,
        bio,
        photo: photoUrl,
    });
    
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
            res.status(500).json({ error: "Failed to Deactivate stylist " + err});
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

const deleteServiceFromStylist = async (req, res) => {
    try {
        const { stylistId, serviceId } = req.params;
    
        const stylist = await Stylist.findById(stylistId);
        if (!stylist) {
          return res.status(404).json({ error: "Stylist not found" });
        }
    
        const service = stylist.services.id(serviceId);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }

        service.deleteOne(); // ⬅ removes subdocument
        await stylist.save(); // ⬅ persists change
    
        res.json({ message: "Service deleted" });

    }   catch (err) {
            res.status(500).json({ error: "Failed to create stylist " + err})
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

export {adminLogin, adminRegister, createStylist, updateStylist, addServiceToStylist, updateServiceToStylist, getStylists, deleteServiceFromStylist, notFound}
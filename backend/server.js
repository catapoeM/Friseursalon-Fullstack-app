import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import helmet from 'helmet';
import homeRoutes from './routes/homeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import stylistRoutes from './routes/stylistRoutes.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'

// Load environment Variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
//const MONGO_URI = process.env.MONGO_URI;

app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
  }
));

const expires = 5 * 60 * 1000;
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
  cookie: {
    httpOnly: true,
    secure: false, // true if production
    sameSite: "lax",
    maxAge: expires
  }
}));

// Middleware to parse JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/api/home', homeRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stylists', stylistRoutes);

// HTTP + Socket.IO Server
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
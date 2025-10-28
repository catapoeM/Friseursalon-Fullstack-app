import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import helmet from 'helmet';
import homeRoutes from './routes/homeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import Booking from './models/bookingModel.js';

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(helmet());
app.use(cors());

// Middleware to parse JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Use routes
app.use('/api/home', homeRoutes);
app.use('/api/booking', bookingRoutes);

// HTTP + Socket.IO Server
const server = http.createServer(app);
const io = new Server(server, {cors:{origin: "*"} });

// socket.IO echtzeitlogik
io.on("connection", async(socket) => {
    console.log(`Client verbunden: ${socket.id}`);

    // Alle bestehenden Buchungen beim verbinden senden
    try {
        const bookings = await Booking.find();
        socket.emit("loadBookings", bookings);
    } catch (error) {
        console.log("Fehler beim Laden der Buchungen:", error.message);
    }

    // Neuen Termin empfangen und broadcasten
    socket.on("newBooking", async (data) => {
        try {
            const newBooking = new Booking(data);
            await newBooking.save();
            io.emit("bookingUpdated", newBooking); // Echtzeit an alle Clients senden
            console.log("Neuer Termin erstellt:", newBooking);
        } catch (error) {
            console.error("Fehler beim Erstellen des Termins:", error.message);
        }
    });

    socket.on("disconnect", () => {
        console.log(`Client getrennt: ${socket.id}`);
    });
});

// Start server
server.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
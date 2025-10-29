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

// Load environment Variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
//const MONGO_URI = process.env.MONGO_URI;

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

// Socket.IO Events
io.on("connection", async (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Alle bestehenden Buchungen senden
  try {
    const bookings = await import("./models/bookingModel.js").then(mod => mod.default.find());
    socket.emit("loadBookings", bookings);
  } catch (error) {
    console.error(error);
  }

  socket.on("newBooking", async (data) => {
    try {
      const Booking = (await import("./models/bookingModel.js")).default;
      const newBooking = new Booking(data);
      await newBooking.save();
      io.emit("bookingUpdated", newBooking);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => console.log(`Client disconnected: ${socket.id}`));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
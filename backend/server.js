import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import homeRoutes from './routes/homeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
const port = process.env.port ?? 8000;

app.use(helmet());
app.use(cors());

// Middleware to parse JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Use routes
app.use('/api/home', homeRoutes);
app.use('/api/booking', bookingRoutes);

// Start server
app.listen(port, () => {
    console.log(`NodeJS Server Läuft unter Port ${port}`);
});
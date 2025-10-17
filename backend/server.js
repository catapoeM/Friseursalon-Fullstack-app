import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import homeRouter from './routes/home.js';

const app = express();
const port = process.env.port ?? 8000;

app.use(helmet());
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/', homeRouter);

// Start server
app.listen(port, () => {
    console.log(`NodeJS Server Läuft unter Port ${port}`);
});
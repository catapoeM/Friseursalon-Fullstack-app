import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const port = process.env.port ?? 8000;

app.use(helmet());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use((req, res) => {
  res.status(404).send('<h1>Seite nicht gefunden</h1>')
});

app.listen(port, () => {
    console.log(`NodeJS Server Läuft unter Port ${port}`);
});
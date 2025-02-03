import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { apiRouter } from './api/apiMain';
// import { cert, initializeApp } from 'firebase-admin/app';
// import { getFirestore } from 'firebase-admin/firestore'; // Import getFirestore
// import * as serviceAccount from './os-theeye.json';
// initializeApp({ credential: cert(<any>serviceAccount) });
// export const db = getFirestore();
const app = express();

app.use((req, res, next) => {
    if (req.method !== 'OPTIONS') {
        console.time(`${req.method} ${req.originalUrl} [CLOSED]`);
        console.log(`${req.method} ${req.originalUrl} [STARTED]`);
        res.on('close', () => {
            console.timeEnd(`${req.method} ${req.originalUrl} [CLOSED]`);
        });
    }
    next();
});

app.get('/', async (req, res) => {
    const time = new Date();
    res.send({ result: true, time, message: 'bear data' });
});

app.get('/ip', async (req, res) => {
    try {
        const ip = await getPublicIP();
        res.send(`Container IP: ${ip}`);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});


app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// http://localhost:8088/api 都會導到 apiRouter
app.use('/api', apiRouter);

app.use((req, res, next) => {
    const url = req.originalUrl;
    res.status(500).send(`<h1>500 Internal Server Error,IP ${req.ip}</h1>`);
});

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
    console.log(`server is running on PORT http://localhost:${PORT}`);
});

function getPublicIP(): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const req = await axios.get('https://api.ipify.org');
        resolve(req.data.trim());
    });
}
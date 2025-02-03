import express from 'express';
export const apiRouter = express();

apiRouter.get('/check', (req, res) => {
    res.send({ result: true, message: 'api ok' });
});

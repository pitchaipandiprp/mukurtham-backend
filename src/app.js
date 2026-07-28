import 'dotenv/config';
import express from 'express';
import corsMiddleware from './middlewares/cors.middleware.js';
import route from './routes/route.js';
import notFoundHandler from './middlewares/not-found.middleware.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api/', route);

app.use(notFoundHandler);

export default app;
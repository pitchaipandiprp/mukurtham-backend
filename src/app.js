import 'dotenv/config';
import express from 'express';
import route from './routes/route.js';
import corsMiddleware from './middlewares/cors.middleware.js';
import staticFileMiddleware from "./middlewares/static-file.middleware.js";
import notFoundHandler from './middlewares/not-found.middleware.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());

// Static files
app.use('/storage', staticFileMiddleware);

// Routes
app.use('/api/', route);
app.use(notFoundHandler);

export default app;
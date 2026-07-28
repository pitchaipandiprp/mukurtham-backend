import cors from 'cors';

const allowedOrigins = [
    'http://127.0.0.1:3001',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
];

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};

export default cors(corsOptions);

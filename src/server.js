import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} : http://127.0.0.1:${PORT}/`);
});

const shutdown = (signal) => {
    console.log(`\nReceived ${signal}. Closing server...`);

    server.close(() => {
        console.log('Server closed successfully');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
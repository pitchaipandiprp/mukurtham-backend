import jwt from 'jsonwebtoken';
import Response from '../utils/response.js';

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return Response.unauthorized(res, 'Authorization token is required');
        }

        if (!authHeader.startsWith('Bearer ')) {
            return Response.unauthorized(res, 'Invalid authorization format');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return Response.unauthorized(res, 'Invalid or expired token');
    }
};

export default authMiddleware;
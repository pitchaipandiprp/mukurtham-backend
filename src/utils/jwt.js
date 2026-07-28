import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';

const generateAccessToken = (payload) => {
    return jwt.sign(payload, jwtConfig.accessToken.secret, {
        expiresIn: jwtConfig.accessToken.expiresIn,
    });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, jwtConfig.refreshToken.secret, {
        expiresIn: jwtConfig.refreshToken.expiresIn,
    });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, jwtConfig.accessToken.secret);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, jwtConfig.refreshToken.secret);
};

const jwtUtils = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};

export default jwtUtils;
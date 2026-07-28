import authService from '../../services/auth/auth.service.js';
import Response from '../../utils/response.js';

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        return Response.success(res, 'Login successful', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const sendOtp = async (req, res) => {
    try {
        const result = await authService.sendOtp(req.body);
        return Response.success(res, 'OTP sent successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const verifyOtp = async (req, res) => {
    try {
        const result = await authService.verifyOtp(req.body);
        return Response.success(res, 'OTP verified successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const otpLogin = async (req, res) => {
    try {
        const result = await authService.otpLogin(req.body);
        return Response.success(res, 'OTP login successful', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const refreshToken = async (req, res) => {
    try {
        if (!req.body?.refreshToken) {
            return Response.error(res, 'Refresh token required');
        }
        const result = await authService.refreshToken(req.body.refreshToken);
        return Response.success(res, 'Token refreshed successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const logout = async (req, res) => {
    try {
        const result = await authService.logout(req.body);
        return Response.success(res, 'Logged out successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};


const authController = {
    login,
    sendOtp,
    verifyOtp,
    otpLogin,
    refreshToken,
    logout,
};

export default authController;
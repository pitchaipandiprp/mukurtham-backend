import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import jwtUtils from '../../utils/jwt.js';
import AppError from '../../utils/app-error.js';
import userService from '../../services/users/user.service.js';

const generateOtp = () => {
    // return Math.floor(100000 + Math.random() * 900000).toString();
    return '123456'; // For testing purposes
};

const login = async (data) => {
    const user = await prisma.users.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        throw new AppError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw new AppError('Invalid email or password');
    }

    if (user.status != 1) {
        throw new AppError('Your account is inactive. Please contact support.');
    }

    const accessToken = jwtUtils.generateAccessToken({
        id: user.id,
        email: user.email,
        mobile: user.mobile,
    });

    const refreshToken = jwtUtils.generateRefreshToken({
        id: user.id,
    });

    await prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            refresh_token: refreshToken,
        },
    });

    const profile = await userService.getProfile({ user_id: user.id });

    return {
        accessToken,
        refreshToken,
        user: profile,
    };
};

const sendOtp = async (data) => {
    const mobile = data.mobile?.trim();

    const user = await prisma.users.findUnique({
        where: {
            mobile,
        },
    });

    if (!user) {
        throw new AppError('Mobile number is not registered');
    }

    if (user.status != 1) {
        throw new AppError('Your account is inactive. Please contact support.');
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const otpHash = await bcrypt.hash(otp, 10);

    await prisma.otpRequest.create({
        data: {
            mobile,
            otp_hash: otpHash,
            expires_at: expiresAt,
            created_at: new Date(),
        },
    });

    return {
        otp,
        expiresAt,
        channel: 'mobile',
    };
};

const verifyOtp = async (data) => {
    const mobile = data.mobile?.trim();
    const otp = data.otp?.trim();

    const otpRequest = await prisma.otpRequest.findFirst({
        where: {
            mobile,
        },
        orderBy: {
            created_at: 'desc',
        },
    });

    if (!otpRequest) {
        throw new AppError('Invalid OTP');
    }

    const isOtpValid = await bcrypt.compare(otp, otpRequest.otp_hash);

    if (!isOtpValid) {
        const attempts = (otpRequest.attempts ?? 0) + 1;

        await prisma.otpRequest.update({
            where: {
                id: otpRequest.id,
            },
            data: {
                attempts,
            },
        });

        if (attempts >= 3) {
            throw new AppError('OTP attempts exceeded');
        }

        throw new AppError('Invalid OTP');
    }

    if (new Date(otpRequest.expires_at) < new Date()) {
        throw new AppError('OTP expired');
    }

    if (otpRequest.verified_at) {
        throw new AppError('OTP already verified');
    }

    await prisma.otpRequest.update({
        where: {
            id: otpRequest.id,
        },
        data: {
            verified_at: new Date(),
            attempts: (otpRequest.attempts ?? 0) + 1,
        },
    });

    return {
        verified: true,
    };
};

const otpLogin = async (data) => {
    await verifyOtp(data);

    const user = await prisma.users.findUnique({
        where: {
            mobile: data.mobile?.trim(),
        },
    });

    if (!user) {
        throw new AppError('Mobile number is not registered');
    }

    const accessToken = jwtUtils.generateAccessToken({
        id: user.id,
        email: user.email,
        mobile: user.mobile,
    });

    const refreshToken = jwtUtils.generateRefreshToken({
        id: user.id,
    });

    await prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            refresh_token: refreshToken,
        },
    });

    const profile = await userService.getProfile({ user_id: user.id });
    return {
        accessToken,
        refreshToken,
        user: profile,
    };
};

const refreshToken = async (refreshTokenValue) => {
    const decoded = jwtUtils.verifyRefreshToken(refreshTokenValue);

    const user = await prisma.users.findUnique({
        where: {
            id: decoded.id,
        },
    });

    if (!user) {
        throw new AppError('User not found');
    }

    if (user.refresh_token !== refreshTokenValue) {
        throw new AppError('Invalid refresh token');
    }

    const accessToken = jwtUtils.generateAccessToken({
        id: user.id,
        email: user.email,
    });

    return {
        accessToken,
    };
};


const logout = async (data) => {
    const userId = data.user_id;
    if (!userId) {
        throw new AppError('Invalid user ID');
    }

    const user = await prisma.users.findUnique({
        where: { id: Number(userId) }
    });

    if (!user) {
        throw new AppError('User not found');
    }

    await prisma.users.update({
        where: {
            id: userId,
        },
        data: {
            refresh_token: null,
        },
    });
};


const authService = {
    login,
    sendOtp,
    verifyOtp,
    otpLogin,
    refreshToken,
    logout,
};

export default authService;
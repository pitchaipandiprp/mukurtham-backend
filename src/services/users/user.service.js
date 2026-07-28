import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const getUsers = async () => {
    return await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            mobile: true,
            created_by: true,
            created_at: true,
            updated_by: true,
            updated_at: true,
        },
    });
};

const getProfile = async (data) => {
    const userId = Number(data?.user_id);

    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            mobile: true,
            created_by: true,
            created_at: true,
            updated_by: true,
            updated_at: true,
            role: {
                select: {
                    name: true
                }
            }
        },
    });

    if (!user) {
        throw new AppError('User profile not found');
    }

    return user;
};

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const existingEmail = await prisma.users.findUnique({
        where: { email: data.email },
    });

    if (existingEmail) {
        throw new AppError('Email already exists');
    }

    const existingMobile = await prisma.users.findUnique({
        where: { mobile: data?.mobile },
    });

    if (existingMobile) {
        throw new AppError('Mobile number already exists');
    }


    const roleCode = data.user_type.trim().toUpperCase();
    const userRole = await prisma.roles.findUnique({
        where: { code: roleCode },
    });

    return await prisma.users.create({
        data: {
            role_id: userRole.id,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            password: hashedPassword,
            created_by: 1,
            created_at: new Date(),
            updated_by: 1,
            updated_at: new Date(),
        },
    });
};

const updateUser = async (data) => {
    const existingUser = await prisma.users.findUnique({
        where: { id: Number(data.user_id) },
    });

    if (!existingUser) {
        throw new AppError('User not found');
    }

    return await prisma.users.update({
        where: {
            id: Number(data.user_id),
        },
        data: {
            name: data.name,
            updated_by: 1,
            updated_at: new Date(),
        },
    });
};

const changePassword = async (data) => {

    if (data.new_password !== data.confirm_password) {
        throw new AppError("New password and confirm password do not match");
    }

    const user = await prisma.users.findUnique({
        where: { id: Number(data.user_id) }
    });

    if (!user) {
        throw new AppError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
        data.current_password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(data.new_password, 10);

    await prisma.users.update({
        where: {
            id: Number(data.user_id)
        },
        data: {
            password: hashedPassword,
            updated_by: 1,
            updated_at: new Date(),
        }
    });
};

const userService = {
    getUsers,
    getProfile,
    createUser,
    updateUser,
    changePassword,
};

export default userService;
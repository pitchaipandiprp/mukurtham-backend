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

const updateStatus = async (data) => {
    const id = Number(data?.id);

    if (!id) {
        throw new AppError('Please provide a valid user ID');
    }

    if (data.status === undefined || data.status === null) {
        throw new AppError('Please provide a valid status');
    }

    let statusId = 0;
    if (data.status === 'delete') {
        statusId = 2; // Assuming 2 represents the deleted status
    } else if (data.status === 'approve') {
        statusId = 1; // Assuming 1 represents the approved status
    } else if (data.status === 'disapprove') {
        statusId = 0; // Assuming 0 represents the disapproved status
    }

    const user = await prisma.users.update({
        where: {
            id: id,
        },
        data: {
            status: statusId,
        },
    });

    return;
};

const userList = async (data) => {
    const where = { status: { not: 2 } }; //Except deleted records

    if (data.role_id) {
        where.role_id = Number(data.role_id);
    }

    if (data.search?.trim()) {
        const search = data.search.trim();

        where.OR = [
            {
                name: {
                    contains: search,
                },
            },
            {
                email: {
                    contains: search,
                },
            },
            {
                mobile: {
                    contains: search,
                },
            },
        ];
    }

    if (data.status !== undefined && data.status !== "") {
        where.status = Number(data.status);
    }

    const page = Number(data.page || 1);
    const limit = Number(data.limit || 10);

    const skip = (page - 1) * limit;

    const [result, total] = await Promise.all([
        prisma.users.findMany({
            where,
            include: {
                role: {
                    select: {
                        name: true,
                    },
                },
            },
            skip,
            take: limit,
            orderBy: data.orderBy || {
                id: "desc",
            },
        }),

        prisma.users.count({
            where,
        }),
    ]);

    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        rows: result,
    };
};

const userService = {
    getUsers,
    getProfile,
    createUser,
    updateUser,
    changePassword,
    userList,
    updateStatus,
};

export default userService;
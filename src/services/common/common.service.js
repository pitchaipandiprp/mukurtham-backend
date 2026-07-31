import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import AppError from '../../utils/app-error.js';

const getCategories = async () => {
    return await prisma.category.findMany();
};


const commonService = {
    getCategories,
};

export default commonService;
import userService from '../../services/users/user.service.js';
import Response from '../../utils/response.js';

const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    Response.success(res, 'Success', users);
};

const getProfile = async (req, res) => {
    try {
        const profile = await userService.getProfile(req.body);
        return Response.success(res, 'Profile fetched successfully', profile);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const createUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        return Response.success(res, 'User created successfully');
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.body);
        return Response.success(res, 'User updated successfully');
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const changePassword = async (req, res) => {
    try {
        await userService.changePassword(req.body);
        return Response.success(res, 'Password changed successfully');
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const updateStatus = async (req, res) => {
    try {
        const result = await userService.updateStatus(req.body);
        return Response.success(res, 'User status updated successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const userList = async (req, res) => {
    try {
        const result = await userService.userList(req.body);
        return Response.success(res, 'User list fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const userController = {
    getUsers,
    getProfile,
    createUser,
    updateUser,
    changePassword,
    userList,
    updateStatus,
};

export default userController;
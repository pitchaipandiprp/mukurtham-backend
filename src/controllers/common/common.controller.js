import commonService from '../../services/common/common.service.js';
import Response from '../../utils/response.js';

const getCategories = async (req, res) => {
    const categories = await commonService.getCategories();
    Response.success(res, 'Success', categories);
};

const getCategoryById = async (req, res) => {
    const category = await commonService.getCategoryById(req.body);
    Response.success(res, 'Success', category);
};

const getFacilities = async (req, res) => {
    const facilities = await commonService.getFacilities(req.body);
    Response.success(res, 'Success', facilities);
};

const getCities = async (req, res) => {
    const cities = await commonService.getCities(req.body);
    Response.success(res, 'Success', cities);
};

const getLocalities = async (req, res) => {
    const localities = await commonService.getLocalities(req.body);
    Response.success(res, 'Success', localities);
};

const commonController = {
    getCategories,
    getCategoryById,
    getFacilities,
    getLocalities,
    getCities,
};

export default commonController;


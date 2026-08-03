import commonService from '../../services/common/common.service.js';
import Response from '../../utils/response.js';

const getCategories = async (req, res) => {
    const categories = await commonService.getCategories();
    Response.success(res, 'Success', categories);
};

const getLocalities = async (req, res) => {
    const localities = await commonService.getLocalities(req.query);
    Response.success(res, 'Success', localities);
};

const commonController = {
    getCategories,
    getLocalities,
};

export default commonController;


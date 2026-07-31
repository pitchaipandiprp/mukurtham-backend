import commonService from '../../services/common/common.service.js';
import Response from '../../utils/response.js';

const getCategories = async (req, res) => {
    const categories = await commonService.getCategories();
    Response.success(res, 'Success', categories);
};

const commonController = {
    getCategories,
};

export default commonController;


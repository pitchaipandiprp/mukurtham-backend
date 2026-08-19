import serviceDatesService from '../../services/vendor/service-dates.service.js';
import Response from '../../utils/response.js';

const createServiceDate = async (req, res) => {
    try {
        const result = await serviceDatesService.createServiceDate(req.body);
        const message = req.body.id ? 'Updated successfully' : 'Created successfully';
        return Response.success(res, message, result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const getServiceDate = async (req, res) => {
    try {
        const result = await serviceDatesService.getServiceDate(req.body);
        return Response.success(res, 'Service date fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const updateServiceDateStatus = async (req, res) => {
    try {
        const result = await serviceDatesService.updateServiceDateStatus(req.body);
        let msg = 'Status updated successfully';
        if (req.body.status == 'delete') {
            msg = 'Deleted successfully';
        }
        return Response.success(res, msg, result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceDateList = async (req, res) => {
    try {
        const result = await serviceDatesService.serviceDateList(req.body);
        return Response.success(res, 'Service dates fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceDateRecords = async (req, res) => {
    try {
        const result = await serviceDatesService.serviceDateRecords(req.body);
        return Response.success(res, 'Service dates fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

export default {
    createServiceDate,
    getServiceDate,
    updateServiceDateStatus,
    serviceDateList,
    serviceDateRecords,
};
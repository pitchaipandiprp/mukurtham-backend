import serviceDatesService from '../../services/main/service-dates.service.js';
import Response from '../../utils/response.js';

const serviceDateRecords = async (req, res) => {
    try {
        const result = await serviceDatesService.serviceDateRecords(req.body);
        return Response.success(res, 'Service dates fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

export default {
    serviceDateRecords,
};
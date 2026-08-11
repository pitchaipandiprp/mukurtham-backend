import galleryService from '../../services/main/gallery.service.js';
import Response from '../../utils/response.js';

const galleryRecords = async (req, res) => {
    try {
        const result = await galleryService.galleryRecords(req.body);
        return Response.success(res, 'Gallery fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const galleryController = {
    galleryRecords,
};

export default galleryController;

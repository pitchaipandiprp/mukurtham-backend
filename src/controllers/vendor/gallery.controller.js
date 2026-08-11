import galleryService from '../../services/vendor/gallery.service.js';
import Response from '../../utils/response.js';
import { UPLOAD_DIR_GALLERY } from '../../config/constant.js';

const createGallery = async (req, res) => {
    try {
        const reqData = {
            ...req.body,
            gallery_image: req.file ? `${UPLOAD_DIR_GALLERY}/${req.file.filename}` : null,
        };

        const result = await galleryService.createGallery(reqData);
        const msg = reqData.id ? 'Gallery updated successfully' : 'Gallery created successfully';
        return Response.success(res, msg, result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const getGallery = async (req, res) => {
    try {
        const result = await galleryService.getGallery(req.body);
        return Response.success(res, 'Gallery fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const updateGalleryStatus = async (req, res) => {
    try {
        const result = await galleryService.updateGalleryStatus(req.body);
        return Response.success(res, 'Gallery status updated successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const galleryList = async (req, res) => {
    try {
        const result = await galleryService.galleryList(req.body);
        return Response.success(res, 'Gallery fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const galleryController = {
    createGallery,
    getGallery,
    galleryList,
    updateGalleryStatus,
};

export default galleryController;

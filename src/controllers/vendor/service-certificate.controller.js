import serviceCertificateService from '../../services/vendor/service-certificate.service.js';
import Response from '../../utils/response.js';
import { UPLOAD_DIR_SERVICE_CERTIFICATE } from '../../config/constant.js';

const createServiceCertificate = async (req, res) => {
    try {
        const reqData = {
            ...req.body,
            aadhar_doc: req.files && req.files.aadhar_doc ? `${UPLOAD_DIR_SERVICE_CERTIFICATE}/${req.files.aadhar_doc[0].filename}` : null,
            pan_doc: req.files && req.files.pan_doc ? `${UPLOAD_DIR_SERVICE_CERTIFICATE}/${req.files.pan_doc[0].filename}` : null,
            gst_doc: req.files && req.files.gst_doc ? `${UPLOAD_DIR_SERVICE_CERTIFICATE}/${req.files.gst_doc[0].filename}` : null,
            bank_doc: req.files && req.files.bank_doc ? `${UPLOAD_DIR_SERVICE_CERTIFICATE}/${req.files.bank_doc[0].filename}` : null,
        };

        const result = await serviceCertificateService.createServiceCertificate(reqData);
        const msg = reqData.id ? 'Updated successfully' : 'Created successfully';
        return Response.success(res, msg, result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const getServiceCertificate = async (req, res) => {
    try {
        const result = await serviceCertificateService.getServiceCertificate(req.body);
        return Response.success(res, 'Service Certificate fetched successfully', result);
    } catch (error) {
        return Response.error(res, error.message, error.statusCode);
    }
};

const serviceCertificateController = {
    createServiceCertificate,
    getServiceCertificate,
};

export default serviceCertificateController;

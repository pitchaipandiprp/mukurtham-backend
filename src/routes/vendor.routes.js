import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import categoryServiceController from '../controllers/vendor/category-service.controller.js';
import categoryServiceValidator from '../validators/vendor/category-service.validator.js';
import galleryController from '../controllers/vendor/gallery.controller.js';
import galleryValidator from '../validators/vendor/gallery.validator.js';
import serviceReviewsController from '../controllers/vendor/service-reviews.controller.js';
import serviceDatesController from '../controllers/vendor/service-dates.controller.js';
import serviceDatesValidator from '../validators/vendor/service-dates.validator.js';
import serviceCertificateValidator from '../validators/vendor/service-certificate.validator.js';
import serviceCertificateController from '../controllers/vendor/service-certificate.controller.js';
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
    '/create-category-service',
    upload({
        folder: "services",
        type: "image",
        maxSize: 5,
    }).single("service_banner_image"),
    categoryServiceValidator.createCategoryService,
    categoryServiceController.createCategoryService
);
router.post('/get-category-service', categoryServiceController.getCategoryService);
router.post('/update-category-service-status', categoryServiceController.updateCategoryServiceStatus);
router.post('/category-service-list', categoryServiceController.categoryServiceList);
router.post('/category-service-records', categoryServiceController.categoryServiceRecords);


router.post(
    '/create-gallery',
    upload({
        folder: "gallery",
        type: "image",
        maxSize: 5,
    }).single("gallery_image"),
    galleryValidator.createGallery,
    galleryController.createGallery
);
router.post('/get-gallery', galleryController.getGallery);
router.post('/update-gallery-status', galleryController.updateGalleryStatus);
router.post('/gallery-list', galleryController.galleryList);
router.post('/gallery-records', galleryController.galleryRecords);

router.post('/service-review-list', serviceReviewsController.serviceReviewList);
router.post('/service-review-records', serviceReviewsController.serviceReviewRecords);
router.post('/update-service-review-status', serviceReviewsController.updateServiceReviewStatus);


router.post('/create-service-date', serviceDatesValidator.createServiceDate, serviceDatesController.createServiceDate);
router.post('/get-service-date', serviceDatesController.getServiceDate);
router.post('/update-service-date-status', serviceDatesController.updateServiceDateStatus);
router.post('/service-date-list', serviceDatesController.serviceDateList);
router.post('/service-date-for-calendar', serviceDatesController.serviceDateForcalendar);

router.post(
    '/create-service-certificate',

    upload({
        folder: "service-certificates",
        type: "image_pdf",
        maxSize: 1,
    }).fields([
        { name: "aadhar_doc", maxCount: 1 },
        { name: "pan_doc", maxCount: 1 },
        { name: "gst_doc", maxCount: 1 },
        { name: "bank_doc", maxCount: 1 },
    ]),
    serviceCertificateValidator.createServiceCertificate,
    serviceCertificateController.createServiceCertificate
);
router.post('/get-service-certificate', serviceCertificateController.getServiceCertificate);

export default router;

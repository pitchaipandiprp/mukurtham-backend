import multer from "multer";
import path from "path";
import fs from "fs";
import { UPLOAD_DIR } from '../config/config.js';
export default multer;

const uploadDirectory = UPLOAD_DIR;

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);

        const fileName =
            `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

        cb(null, fileName);
    },
});

// Image upload
const imageFileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            )
        );
    }
};

// PDF upload
const pdfFileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only PDF files are allowed"
            )
        );
    }
};

// Image & PDF upload

const imageAndPdfFileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only image and PDF files are allowed"
            )
        );
    }
};

export const imageUpload = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export const pdfUpload = multer({
    storage,
    fileFilter: pdfFileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

export const imageAndPdfUpload = multer({
    storage,
    fileFilter: imageAndPdfFileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
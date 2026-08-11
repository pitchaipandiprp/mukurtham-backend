import multer from "multer";
import path from "path";
import fs from "fs";

import {
    UPLOAD_DIR,
} from "../config/constant.js";

/*
 * Create upload middleware
 *
 * Usage:
 * upload({
 *     folder: "services",
 *     type: "image",
 *     maxSize: 5
 * })
 */
export const upload = ({
    folder = "",
    type = "image",
    maxSize = 5,
} = {}) => {

    /*
     * Create physical directory
     */
    const uploadDirectory = folder
        ? path.join(
            UPLOAD_DIR,
            folder
        )
        : UPLOAD_DIR;

    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(
            uploadDirectory,
            {
                recursive: true,
            }
        );
    }

    /*
     * Storage
     */
    const storage =
        multer.diskStorage({
            destination: (
                req,
                file,
                cb
            ) => {
                cb(
                    null,
                    uploadDirectory
                );
            },

            filename: (
                req,
                file,
                cb
            ) => {

                const extension =
                    path.extname(
                        file.originalname
                    );

                const fileName =
                    `${Date.now()}-${Math.round(
                        Math.random() * 1e9
                    )}${extension}`;

                cb(
                    null,
                    fileName
                );
            },
        });

    /*
     * File filter
     */
    const fileFilter = (
        req,
        file,
        cb
    ) => {

        const imageTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        const pdfTypes = [
            "application/pdf",
        ];

        const videoTypes = [
            "video/mp4",
            "video/webm",
            "video/quicktime",
        ];

        let allowedTypes = [];

        switch (type) {

            case "image":
                allowedTypes =
                    imageTypes;
                break;

            case "pdf":
                allowedTypes =
                    pdfTypes;
                break;

            case "video":
                allowedTypes =
                    videoTypes;
                break;

            case "image_pdf":
                allowedTypes = [
                    ...imageTypes,
                    ...pdfTypes,
                ];
                break;

            case "image_video":
                allowedTypes = [
                    ...imageTypes,
                    ...videoTypes,
                ];
                break;

            case "all":
                allowedTypes = [
                    ...imageTypes,
                    ...pdfTypes,
                    ...videoTypes,
                ];
                break;

            default:
                return cb(
                    new Error(
                        "Invalid upload type"
                    )
                );
        }

        if (
            allowedTypes.includes(
                file.mimetype
            )
        ) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    `Invalid file type. Allowed type: ${type}`
                )
            );
        }
    };

    /*
     * Multer
     */
    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize:
                maxSize *
                1024 *
                1024,
        },
    });
};
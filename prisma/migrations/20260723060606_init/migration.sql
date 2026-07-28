/*
  Warnings:

  - You are about to drop the `otprequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `otprequest`;

-- CreateTable
CREATE TABLE `otp_request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mobile` VARCHAR(20) NOT NULL,
    `otp_hash` TEXT NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `verified_at` DATETIME(3) NULL,
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NULL,

    INDEX `otp_request_mobile_idx`(`mobile`),
    INDEX `otp_request_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

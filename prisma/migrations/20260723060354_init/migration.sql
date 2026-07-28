-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Roles_name_key`(`name`),
    UNIQUE INDEX `Roles_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `mobile` VARCHAR(20) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `refresh_token` TEXT NULL,
    `created_by` INTEGER NULL,
    `created_at` DATETIME(3) NULL,
    `updated_by` INTEGER NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_mobile_key`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtpRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mobile` VARCHAR(20) NOT NULL,
    `otp_hash` TEXT NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `verified_at` DATETIME(3) NULL,
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NULL,

    INDEX `OtpRequest_mobile_idx`(`mobile`),
    INDEX `OtpRequest_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

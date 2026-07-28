/*
  Warnings:

  - You are about to alter the column `name` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(10)`.
  - You are about to alter the column `code` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `roles` MODIFY `name` VARCHAR(10) NOT NULL,
    MODIFY `code` VARCHAR(10) NOT NULL;

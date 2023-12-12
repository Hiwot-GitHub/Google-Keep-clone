/*
  Warnings:

  - You are about to drop the `note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_ownerid_fkey`;

-- DropTable
DROP TABLE `note`;

-- DropTable
DROP TABLE `user`;

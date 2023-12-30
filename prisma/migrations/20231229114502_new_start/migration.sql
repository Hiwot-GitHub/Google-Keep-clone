/*
  Warnings:

  - The primary key for the `notelabel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `labelId` on the `notelabel` table. All the data in the column will be lost.
  - You are about to drop the column `noteId` on the `notelabel` table. All the data in the column will be lost.
  - Added the required column `id` to the `NoteLabel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notelabel` DROP FOREIGN KEY `NoteLabel_labelId_fkey`;

-- DropForeignKey
ALTER TABLE `notelabel` DROP FOREIGN KEY `NoteLabel_noteId_fkey`;

-- AlterTable
ALTER TABLE `notelabel` DROP PRIMARY KEY,
    DROP COLUMN `labelId`,
    DROP COLUMN `noteId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

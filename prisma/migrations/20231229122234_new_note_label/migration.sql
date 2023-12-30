/*
  Warnings:

  - A unique constraint covering the columns `[noteId,labelId]` on the table `NoteLabel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labelId` to the `NoteLabel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noteId` to the `NoteLabel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notelabel` ADD COLUMN `labelId` INTEGER NOT NULL,
    ADD COLUMN `noteId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `NoteLabel_noteId_labelId_key` ON `NoteLabel`(`noteId`, `labelId`);

-- AddForeignKey
ALTER TABLE `NoteLabel` ADD CONSTRAINT `NoteLabel_noteId_fkey` FOREIGN KEY (`noteId`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteLabel` ADD CONSTRAINT `NoteLabel_labelId_fkey` FOREIGN KEY (`labelId`) REFERENCES `Label`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `notelabel` DROP FOREIGN KEY `NoteLabel_noteId_fkey`;

-- AddForeignKey
ALTER TABLE `NoteLabel` ADD CONSTRAINT `NoteLabel_noteId_fkey` FOREIGN KEY (`noteId`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

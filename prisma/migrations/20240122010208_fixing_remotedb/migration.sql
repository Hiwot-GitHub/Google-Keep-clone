-- DropForeignKey
ALTER TABLE `_notelabel` DROP FOREIGN KEY `_NoteLabel_A_fkey`;

-- DropForeignKey
ALTER TABLE `_notelabel` DROP FOREIGN KEY `_NoteLabel_B_fkey`;

-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_ownerid_fkey`;

-- DropForeignKey
ALTER TABLE `notelabel` DROP FOREIGN KEY `NoteLabel_labelId_fkey`;

-- DropForeignKey
ALTER TABLE `notelabel` DROP FOREIGN KEY `NoteLabel_noteId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- RenameIndex
ALTER TABLE `account` RENAME INDEX `Account_userId_fkey` TO `Account_userId_idx`;

-- RenameIndex
ALTER TABLE `note` RENAME INDEX `Note_ownerid_fkey` TO `Note_ownerid_idx`;

-- RenameIndex
ALTER TABLE `notelabel` RENAME INDEX `NoteLabel_labelId_fkey` TO `NoteLabel_labelId_idx`;

-- RenameIndex
ALTER TABLE `session` RENAME INDEX `Session_userId_fkey` TO `Session_userId_idx`;

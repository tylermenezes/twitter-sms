-- CreateTable
CREATE TABLE `Subscription` (
    `phoneNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`phoneNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProcessedTweet` (
    `id` VARCHAR(191) NOT NULL,
    `account` VARCHAR(191) NOT NULL,
    `postedAt` DATETIME(3) NOT NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

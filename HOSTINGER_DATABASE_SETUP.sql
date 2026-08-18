-- INSP AUTO production database schema
-- This file creates tables only. It does not insert demo, customer, order, or review data.
-- Select the Hostinger database u589090822_inspauto in phpMyAdmin before running it.

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `openId` VARCHAR(64) NOT NULL UNIQUE,
  `name` TEXT,
  `email` VARCHAR(320),
  `loginMethod` VARCHAR(64),
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_credentials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(320) NOT NULL UNIQUE,
  `passwordHash` VARCHAR(255) NOT NULL,
  `enabled` INT NOT NULL DEFAULT 1,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `otp_challenges` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(320) NOT NULL,
  `codeHash` VARCHAR(128) NOT NULL,
  `expiresAt` TIMESTAMP NOT NULL,
  `attempts` INT NOT NULL DEFAULT 0,
  `consumedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_sessions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(320) NOT NULL,
  `tokenHash` VARCHAR(128) NOT NULL UNIQUE,
  `expiresAt` TIMESTAMP NOT NULL,
  `revokedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastSeenAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `phone` VARCHAR(40),
  `vin` VARCHAR(64),
  `orderNumber` VARCHAR(120),
  `subject` VARCHAR(160) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'read', 'in_progress', 'replied', 'resolved') NOT NULL DEFAULT 'new',
  `internalNotes` TEXT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customerName` VARCHAR(120) NOT NULL,
  `deliveryEmail` VARCHAR(320) NOT NULL,
  `vin` VARCHAR(64),
  `selectedPlan` VARCHAR(120) NOT NULL,
  `amountPence` INT NOT NULL,
  `paymentStatus` ENUM('pending', 'paid', 'failed') NOT NULL DEFAULT 'pending',
  `fulfillmentStatus` ENUM('pending', 'processing', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  `paymentReference` VARCHAR(180),
  `paidAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `webhook_events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `eventId` VARCHAR(180) NOT NULL UNIQUE,
  `eventType` VARCHAR(120) NOT NULL,
  `companyId` VARCHAR(180),
  `signatureValid` INT NOT NULL DEFAULT 0,
  `processedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `actorEmail` VARCHAR(320),
  `action` VARCHAR(120) NOT NULL,
  `entityType` VARCHAR(80),
  `entityId` VARCHAR(120),
  `requestId` VARCHAR(120),
  `metadata` TEXT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `order_vehicles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`lineId` varchar(120) NOT NULL,
	`vehicleIndex` int NOT NULL,
	`registration` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `order_vehicles_id` PRIMARY KEY(`id`)
);

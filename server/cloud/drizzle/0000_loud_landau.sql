CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`student_code` text NOT NULL,
	`class_id` text NOT NULL,
	`completed_at` text NOT NULL,
	`payload` text NOT NULL,
	FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `attempts_student` ON `attempts` (`student_code`,`completed_at`);--> statement-breakpoint
CREATE TABLE `classes` (
	`id` text PRIMARY KEY NOT NULL,
	`pin_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `classes_pin_hash_unique` ON `classes` (`pin_hash`);--> statement-breakpoint
CREATE TABLE `content_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`object_key` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);

--> statement-breakpoint
CREATE TRIGGER immutable_attempt_update BEFORE UPDATE ON attempts BEGIN SELECT RAISE(ABORT,'Attempts are append-only'); END;
--> statement-breakpoint
CREATE TRIGGER immutable_attempt_delete BEFORE DELETE ON attempts BEGIN SELECT RAISE(ABORT,'Attempts are append-only'); END;

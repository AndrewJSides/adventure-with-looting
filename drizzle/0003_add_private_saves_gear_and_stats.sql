ALTER TABLE `game_save` ADD `owner_key` text NOT NULL DEFAULT 'owner';
--> statement-breakpoint
ALTER TABLE `game_save` ADD `armor_name` text NOT NULL DEFAULT 'Traveler Cloak';
--> statement-breakpoint
ALTER TABLE `game_save` ADD `armor_defense` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `charm_name` text NOT NULL DEFAULT 'None';
--> statement-breakpoint
ALTER TABLE `game_save` ADD `crit_chance` real NOT NULL DEFAULT 0.05;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `items` text NOT NULL DEFAULT '[]';
--> statement-breakpoint
ALTER TABLE `game_save` ADD `kills` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `rooms_cleared` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `bosses_defeated` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `runs_started` integer NOT NULL DEFAULT 1;
--> statement-breakpoint
CREATE UNIQUE INDEX `game_save_owner_key_unique` ON `game_save` (`owner_key`);
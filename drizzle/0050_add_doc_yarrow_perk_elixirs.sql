ALTER TABLE `game_save` ADD `yarrow_location` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `perk_inventory` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `active_perks` text DEFAULT '[]' NOT NULL;
ALTER TABLE `game_save` ADD `base_states` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `respawn_base` text DEFAULT 'village' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `raw_meat` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `cooked_meals` integer DEFAULT 0 NOT NULL;

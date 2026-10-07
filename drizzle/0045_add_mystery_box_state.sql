ALTER TABLE `game_save` ADD `box_location` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `box_pulls_remaining` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `box_pool_state` text DEFAULT '[]' NOT NULL;

ALTER TABLE `game_save` ADD `sewer_visited` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `sewer_boss_defeated` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `sewer_looted_cache_ids` text DEFAULT '[]' NOT NULL;

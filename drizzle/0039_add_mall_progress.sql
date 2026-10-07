ALTER TABLE `game_save` ADD `mall_visited` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `mall_boss_defeated` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `mall_looted_container_ids` text DEFAULT '[]' NOT NULL;

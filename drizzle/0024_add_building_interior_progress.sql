ALTER TABLE `game_save` ADD `visited_building_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `interior_looted_container_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `interior_defeated_enemy_ids` text DEFAULT '[]' NOT NULL;

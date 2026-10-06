ALTER TABLE `game_save` ADD `dungeon_progress` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `dungeon_bosses_defeated` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `dungeon_looted_chest_ids` text DEFAULT '[]' NOT NULL;

ALTER TABLE `game_save` ADD `planks` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `barricades` text DEFAULT '[]' NOT NULL;

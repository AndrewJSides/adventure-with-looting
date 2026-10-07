ALTER TABLE `game_save` ADD `main_story_state` text DEFAULT 'not_started' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `main_story_chapter` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `story_flags` text DEFAULT '[]' NOT NULL;

ALTER TABLE `game_save` ADD `story_intro_seen` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `veil_truth_stage` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `veil_truth_choice` text;

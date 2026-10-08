ALTER TABLE `game_save` ADD `holdout_best_waves` text NOT NULL DEFAULT '[]';
--> statement-breakpoint
ALTER TABLE `game_save` ADD `holdout_completions` text NOT NULL DEFAULT '[]';

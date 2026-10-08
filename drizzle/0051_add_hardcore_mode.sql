ALTER TABLE `game_save` ADD `hardcore_mode` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `next_run_hardcore` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `hardcore_boss_rewards` integer DEFAULT 0 NOT NULL;

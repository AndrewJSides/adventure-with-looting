ALTER TABLE `game_save` ADD `origin` text DEFAULT 'village' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `farmhouse_intro_stage` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `farmhouse_reward_claimed` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `health_potions` integer DEFAULT 0 NOT NULL;

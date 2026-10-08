ALTER TABLE `game_save` ADD `fishing_rods` text NOT NULL DEFAULT '[]';
--> statement-breakpoint
ALTER TABLE `game_save` ADD `equipped_fishing_rod` text NOT NULL DEFAULT 'none';
--> statement-breakpoint
ALTER TABLE `game_save` ADD `wriggler_bait` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `storm_lures` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `raw_fish` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `silver_eels` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `golden_koi` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `sunken_keys` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `sunken_relics` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `fish_caught` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `best_fish_streak` integer NOT NULL DEFAULT 0;

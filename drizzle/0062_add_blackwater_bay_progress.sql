ALTER TABLE `game_save` ADD `blackwater_visited` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `bay_skiff_unlocked` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `lighthouse_climbed` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `wreckmother_killed` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `wreckmother_respawn_day` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `wreckmother_x` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `wreckmother_y` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `wreckmother_hp` real DEFAULT 0 NOT NULL;

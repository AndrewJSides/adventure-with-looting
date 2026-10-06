ALTER TABLE `game_save` ADD `keys` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `lifesteal` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `thorns` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `dash_reduction` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `move_speed` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `pickup_radius` real DEFAULT 0 NOT NULL;
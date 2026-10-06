ALTER TABLE `game_save` ADD `dog_adopted` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `dog_level` integer DEFAULT 1 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `dog_x` real DEFAULT 1210 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `dog_y` real DEFAULT 15715 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `dog_hp` real DEFAULT 64 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `dog_kills` integer DEFAULT 0 NOT NULL;

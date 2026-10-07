ALTER TABLE `game_save` ADD `pipe_bombs` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `molotovs` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `rags` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `selected_throwable` text DEFAULT 'pipeBomb' NOT NULL;

ALTER TABLE `game_save` ADD `volatile_kills` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `volatile_eyes` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `volatile_trophy_owned` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `volatile_nest_despawned_ids` text DEFAULT '[]' NOT NULL;

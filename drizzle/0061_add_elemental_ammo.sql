ALTER TABLE `game_save` ADD `incendiary_ammo` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `frost_ammo` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `shock_ammo` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `selected_ammo_type` text DEFAULT 'standard' NOT NULL;

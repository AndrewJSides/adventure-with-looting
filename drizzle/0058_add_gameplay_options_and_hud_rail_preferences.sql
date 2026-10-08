ALTER TABLE `game_save` ADD `screen_shake_enabled` integer DEFAULT true NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `damage_numbers_enabled` integer DEFAULT true NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `ambient_particle_density` text DEFAULT 'full' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `zombie_audio_volume` real DEFAULT 1 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `auto_loot_common` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `hud_rail_collapsed` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `hud_rail_auto_collapse` text DEFAULT 'never' NOT NULL;

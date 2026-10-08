ALTER TABLE `game_save` ADD `region_weather` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `weather_cycle_tick` integer DEFAULT 0 NOT NULL;

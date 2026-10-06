ALTER TABLE `game_save` ADD `quest_state` text DEFAULT 'not_started' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `quest_travel_out` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `quest_travel_back` integer DEFAULT false NOT NULL;

ALTER TABLE `game_save` ADD `ward_rounds_stage` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `quarantine_vial_found` integer DEFAULT false NOT NULL;

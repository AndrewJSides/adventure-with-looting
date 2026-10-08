ALTER TABLE `game_save` ADD `bandages` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `lab_chemicals` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `hospital_note_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `hospital_generator_powered` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `hospital_boss_defeated` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `hospital_visited` integer DEFAULT 0 NOT NULL;

ALTER TABLE `game_save` ADD `opened_chest_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `claimed_pickup_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `claimed_breakable_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `defeated_enemy_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `cleared_room_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `secret_opened_room_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `chests_opened` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `run_started_at` text DEFAULT '' NOT NULL;
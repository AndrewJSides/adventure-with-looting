ALTER TABLE `game_save` ADD `collected_rule_ids` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `game_save` ADD `read_rule_ids` text DEFAULT '[]' NOT NULL;

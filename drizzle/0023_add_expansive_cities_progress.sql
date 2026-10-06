ALTER TABLE game_save ADD COLUMN frontier_quest_state text DEFAULT 'not_started' NOT NULL;
--> statement-breakpoint
ALTER TABLE game_save ADD COLUMN ruined_looted_site_ids text DEFAULT '[]' NOT NULL;

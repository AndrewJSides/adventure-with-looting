ALTER TABLE game_save ADD COLUMN gadget_name TEXT NOT NULL DEFAULT 'None';
--> statement-breakpoint
ALTER TABLE game_save ADD COLUMN flashlight_on INTEGER NOT NULL DEFAULT 0;

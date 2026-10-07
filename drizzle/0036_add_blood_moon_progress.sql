ALTER TABLE game_save ADD COLUMN blood_moons INTEGER NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE game_save ADD COLUMN blood_moons_survived INTEGER NOT NULL DEFAULT 0;

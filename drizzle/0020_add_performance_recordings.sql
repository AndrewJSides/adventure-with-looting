CREATE TABLE `perf_recordings` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `owner_key` text NOT NULL,
  `started_at` integer NOT NULL,
  `stopped_at` integer NOT NULL,
  `sample_count` integer NOT NULL,
  `average_fps` real NOT NULL,
  `average_frame_ms` real NOT NULL,
  `hotspot` text NOT NULL,
  `chunk_load_count` integer NOT NULL,
  `samples` text NOT NULL,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `perf_recordings_owner_started_idx` ON `perf_recordings` (`owner_key`,`started_at`);
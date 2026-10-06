CREATE TABLE `perf_recordings_global` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
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
INSERT INTO `perf_recordings_global` (`id`, `started_at`, `stopped_at`, `sample_count`, `average_fps`, `average_frame_ms`, `hotspot`, `chunk_load_count`, `samples`, `created_at`)
SELECT `id`, `started_at`, `stopped_at`, `sample_count`, `average_fps`, `average_frame_ms`, `hotspot`, `chunk_load_count`, `samples`, `created_at`
FROM `perf_recordings`;
--> statement-breakpoint
DROP TABLE `perf_recordings`;
--> statement-breakpoint
ALTER TABLE `perf_recordings_global` RENAME TO `perf_recordings`;
--> statement-breakpoint
CREATE INDEX `perf_recordings_started_idx` ON `perf_recordings` (`started_at`);
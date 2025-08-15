/*
  Warnings:

  - You are about to drop the column `tags` on the `user_interactions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_interactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anchor_id" TEXT NOT NULL,
    "content_id" TEXT,
    "user_id" TEXT,
    "category" TEXT NOT NULL,
    "payload_json" JSONB NOT NULL,
    CONSTRAINT "user_interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user_interactions" ("anchor_id", "category", "created_at", "id", "payload_json", "user_id") SELECT "anchor_id", "category", "created_at", "id", "payload_json", "user_id" FROM "user_interactions";
DROP TABLE "user_interactions";
ALTER TABLE "new_user_interactions" RENAME TO "user_interactions";
CREATE INDEX "idx_user_anchor" ON "user_interactions"("user_id", "anchor_id");
CREATE INDEX "idx_content_time" ON "user_interactions"("content_id", "created_at");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

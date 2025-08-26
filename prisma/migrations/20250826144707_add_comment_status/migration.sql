-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "response" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new'
);
INSERT INTO "new_Comments" ("content_id", "created_at", "id", "response", "text", "user_id") SELECT "content_id", "created_at", "id", "response", "text", "user_id" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
CREATE INDEX "idx_comment_content_time" ON "Comments"("content_id", "created_at");
CREATE INDEX "idx_comment_user_content" ON "Comments"("user_id", "content_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

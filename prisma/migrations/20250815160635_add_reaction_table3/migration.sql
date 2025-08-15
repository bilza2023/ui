/*
  Warnings:

  - You are about to drop the `user_interactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user_interactions";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_comment_content_time" ON "Comments"("content_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_comment_user_content" ON "Comments"("user_id", "content_id");

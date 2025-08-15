/*
  Warnings:

  - You are about to drop the `Reaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reaction";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_user_content" ON "Likes"("user_id", "content_id");

-- CreateIndex
CREATE UNIQUE INDEX "Likes_user_id_content_id_key" ON "Likes"("user_id", "content_id");

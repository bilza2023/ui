-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_user_content" ON "Reaction"("user_id", "content_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_user_id_content_id_key" ON "Reaction"("user_id", "content_id");

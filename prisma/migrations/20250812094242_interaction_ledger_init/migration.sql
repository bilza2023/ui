-- CreateTable
CREATE TABLE "user_interactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anchor_id" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "user_id" TEXT,
    "category" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "payload_json" JSONB NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_actor_anchor" ON "user_interactions"("actor_id", "anchor_id");

-- CreateIndex
CREATE INDEX "idx_user_anchor" ON "user_interactions"("user_id", "anchor_id");

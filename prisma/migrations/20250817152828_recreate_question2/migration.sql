-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "tcode" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Subscription_user_id_tcode_idx" ON "Subscription"("user_id", "tcode");

-- CreateTable
CREATE TABLE "HomeIndexEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_homeindex_cat_sort_pin" ON "HomeIndexEntry"("category", "sortOrder", "pinned");

-- CreateIndex
CREATE UNIQUE INDEX "uniq_homeindex_category_url" ON "HomeIndexEntry"("category", "url");

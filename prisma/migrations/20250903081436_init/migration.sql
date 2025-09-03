/*
  Warnings:

  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `filename` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SyllabusTcode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SyllabusChapter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tcodeId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SyllabusChapter_tcodeId_fkey" FOREIGN KEY ("tcodeId") REFERENCES "SyllabusTcode" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SyllabusExercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapterId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SyllabusExercise_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "SyllabusChapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "tcode" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "exercise" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "tags" JSONB,
    "status" TEXT,
    "thumbnail" TEXT,
    "sortOrder" INTEGER,
    "timed" BOOLEAN NOT NULL DEFAULT false,
    "deck" JSONB,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" DATETIME NOT NULL
);
INSERT INTO "new_Question" ("chapter", "createdAt", "deck", "description", "editedAt", "exercise", "name", "note", "sortOrder", "status", "tags", "tcode", "thumbnail", "timed", "type") SELECT "chapter", "createdAt", "deck", "description", "editedAt", "exercise", "name", "note", "sortOrder", "status", "tags", "tcode", "thumbnail", "timed", "type" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE INDEX "Question_tcode_idx" ON "Question"("tcode");
CREATE INDEX "Question_tcode_chapter_idx" ON "Question"("tcode", "chapter");
CREATE INDEX "Question_tcode_chapter_exercise_idx" ON "Question"("tcode", "chapter", "exercise");
CREATE INDEX "Question_tcode_chapter_exercise_sortOrder_idx" ON "Question"("tcode", "chapter", "exercise", "sortOrder");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("created_at", "email", "id", "password_hash") SELECT "created_at", "email", "id", "password_hash" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_idx" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "SyllabusTcode_slug_key" ON "SyllabusTcode"("slug");

-- CreateIndex
CREATE INDEX "SyllabusChapter_tcodeId_idx" ON "SyllabusChapter"("tcodeId");

-- CreateIndex
CREATE INDEX "SyllabusChapter_tcodeId_sortOrder_idx" ON "SyllabusChapter"("tcodeId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "SyllabusChapter_tcodeId_slug_key" ON "SyllabusChapter"("tcodeId", "slug");

-- CreateIndex
CREATE INDEX "SyllabusExercise_chapterId_idx" ON "SyllabusExercise"("chapterId");

-- CreateIndex
CREATE INDEX "SyllabusExercise_chapterId_sortOrder_idx" ON "SyllabusExercise"("chapterId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "SyllabusExercise_chapterId_slug_key" ON "SyllabusExercise"("chapterId", "slug");

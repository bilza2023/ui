-- CreateTable
CREATE TABLE "Question" (
    "filename" TEXT NOT NULL PRIMARY KEY,
    "tcode" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "exercise" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "tags" JSONB,
    "status" TEXT,
    "sortOrder" INTEGER,
    "timed" BOOLEAN NOT NULL DEFAULT false,
    "deck" JSONB,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "response" TEXT
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StudentMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Question_tcode_idx" ON "Question"("tcode");

-- CreateIndex
CREATE INDEX "Question_tcode_chapter_idx" ON "Question"("tcode", "chapter");

-- CreateIndex
CREATE INDEX "Question_tcode_chapter_exercise_idx" ON "Question"("tcode", "chapter", "exercise");

-- CreateIndex
CREATE INDEX "Question_tcode_chapter_exercise_sortOrder_idx" ON "Question"("tcode", "chapter", "exercise", "sortOrder");

-- CreateIndex
CREATE INDEX "idx_comment_content_time" ON "Comments"("content_id", "created_at");

-- CreateIndex
CREATE INDEX "idx_comment_user_content" ON "Comments"("user_id", "content_id");

-- CreateIndex
CREATE INDEX "idx_user_content" ON "Likes"("user_id", "content_id");

-- CreateIndex
CREATE UNIQUE INDEX "Likes_user_id_content_id_key" ON "Likes"("user_id", "content_id");

-- CreateIndex
CREATE INDEX "StudentMessage_user_id_read_created_at_idx" ON "StudentMessage"("user_id", "read", "created_at");

-- CreateIndex
CREATE INDEX "StudentMessage_user_id_created_at_idx" ON "StudentMessage"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

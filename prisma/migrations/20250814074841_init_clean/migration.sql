-- CreateTable
CREATE TABLE "Question" (
    "filename" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "tags" JSONB,
    "status" TEXT,
    "timed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" DATETIME NOT NULL,
    "deck" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_filename" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "start" REAL NOT NULL,
    "end" REAL NOT NULL,
    CONSTRAINT "Slide_question_filename_fkey" FOREIGN KEY ("question_filename") REFERENCES "Question" ("filename") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SlideItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slideId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "showAt" REAL,
    "textContent" TEXT,
    "numValue" REAL,
    "label" TEXT,
    "imageUrl" TEXT,
    "colorHex" TEXT,
    "typeHint" TEXT,
    "extraJson" JSONB,
    CONSTRAINT "SlideItem_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "Slide" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_interactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anchor_id" TEXT NOT NULL,
    "user_id" TEXT,
    "category" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "payload_json" JSONB NOT NULL,
    CONSTRAINT "user_interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
CREATE INDEX "idx_user_anchor" ON "user_interactions"("user_id", "anchor_id");

-- CreateIndex
CREATE INDEX "StudentMessage_user_id_read_created_at_idx" ON "StudentMessage"("user_id", "read", "created_at");

-- CreateIndex
CREATE INDEX "StudentMessage_user_id_created_at_idx" ON "StudentMessage"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

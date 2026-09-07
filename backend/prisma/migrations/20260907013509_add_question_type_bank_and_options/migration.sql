-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM (
    'TRUE_FALSE',
    'MULTIPLE_CHOICE',
    'MULTIPLE_ANSWER'
);

-- CreateEnum
CREATE TYPE "QuestionBank" AS ENUM (
    'CEBRASPE',
    'FCC',
    'CENSAGRARIO',
    'OTHER'
);

-- Add temporary nullable columns
ALTER TABLE "questions"
ADD COLUMN "bank" "QuestionBank",
ADD COLUMN "type" "QuestionType";

-- Fill existing questions with temporary values
UPDATE "questions"
SET
    "bank" = 'OTHER',
    "type" = 'MULTIPLE_CHOICE'
WHERE "bank" IS NULL
   OR "type" IS NULL;

-- Make columns required
ALTER TABLE "questions"
ALTER COLUMN "bank" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL;

-- CreateTable
CREATE TABLE "question_options" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "questions_statement_key"
ON "questions"("statement");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key"
ON "subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "themes_name_key"
ON "themes"("name");

-- AddForeignKey
ALTER TABLE "question_options"
ADD CONSTRAINT "question_options_questionId_fkey"
FOREIGN KEY ("questionId")
REFERENCES "questions"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;
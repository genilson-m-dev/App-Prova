-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "startment" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "dificulty" "Difficulty" NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

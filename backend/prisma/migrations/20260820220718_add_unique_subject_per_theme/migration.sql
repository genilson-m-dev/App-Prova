/*
  Warnings:

  - A unique constraint covering the columns `[themeId,name]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subjects_themeId_name_key" ON "subjects"("themeId", "name");

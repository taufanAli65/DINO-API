/*
  Warnings:

  - You are about to drop the column `questionId` on the `Student_Answer` table. All the data in the column will be lost.
  - Added the required column `quizId` to the `Student_Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Student_Answer" DROP CONSTRAINT "Student_Answer_questionId_fkey";

-- AlterTable
ALTER TABLE "public"."Student_Answer" DROP COLUMN "questionId",
ADD COLUMN     "quizId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Student_Answer" ADD CONSTRAINT "Student_Answer_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "public"."Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

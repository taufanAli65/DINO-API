-- AlterTable
ALTER TABLE "public"."Student_Answer" ADD COLUMN     "quizId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Student_Answer" ADD CONSTRAINT "Student_Answer_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "public"."Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

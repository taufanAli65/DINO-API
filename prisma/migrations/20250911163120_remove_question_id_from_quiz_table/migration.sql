/*
  Warnings:

  - You are about to drop the column `questionId` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Quiz" DROP CONSTRAINT "Quiz_questionId_fkey";

-- AlterTable
ALTER TABLE "public"."Quiz" DROP COLUMN "questionId";

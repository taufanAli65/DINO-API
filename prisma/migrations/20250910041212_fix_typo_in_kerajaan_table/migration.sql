/*
  Warnings:

  - You are about to drop the column `stardate` on the `Kerajaan` table. All the data in the column will be lost.
  - Added the required column `startdate` to the `Kerajaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Kerajaan" DROP COLUMN "stardate",
ADD COLUMN     "startdate" TIMESTAMP(3) NOT NULL;

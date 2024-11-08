/*
  Warnings:

  - You are about to drop the column `diseaseImage` on the `diseases` table. All the data in the column will be lost.
  - You are about to drop the column `isPending` on the `diseases` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "diseases" DROP COLUMN "diseaseImage",
DROP COLUMN "isPending";

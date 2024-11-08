/*
  Warnings:

  - You are about to drop the column `postId` on the `votes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,communityPostId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "votes_userId_postId_key";

-- AlterTable
ALTER TABLE "votes" DROP COLUMN "postId";

-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_communityPostId_key" ON "votes"("userId", "communityPostId");

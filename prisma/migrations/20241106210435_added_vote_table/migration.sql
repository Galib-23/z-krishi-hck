/*
  Warnings:

  - You are about to drop the column `downvotes` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `downvotes` on the `community_posts` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `community_posts` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- DropForeignKey
ALTER TABLE "community_posts" DROP CONSTRAINT "community_posts_userId_fkey";

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";

-- AlterTable
ALTER TABLE "community_posts" DROP COLUMN "downvotes",
DROP COLUMN "upvotes",
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT,
    "answerId" TEXT,
    "type" "VoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "communityPostId" TEXT,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_postId_key" ON "votes"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_answerId_key" ON "votes"("userId", "answerId");

-- AddForeignKey
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_communityPostId_fkey" FOREIGN KEY ("communityPostId") REFERENCES "community_posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

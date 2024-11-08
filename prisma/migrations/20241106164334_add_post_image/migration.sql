/*
  Warnings:

  - Added the required column `postImage` to the `community_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "community_posts" ADD COLUMN     "postImage" TEXT NOT NULL;

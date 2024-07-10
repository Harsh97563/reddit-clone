/*
  Warnings:

  - You are about to drop the column `downvotedPost` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `upvotedPost` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "downvotedPost",
DROP COLUMN "upvotedPost";

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "type" "VoteType" NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_key" ON "Vote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_postId_key" ON "Vote"("postId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

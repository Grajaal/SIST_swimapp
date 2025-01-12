/*
  Warnings:

  - You are about to drop the column `has_team` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "has_team",
ADD COLUMN     "hasTeam" BOOLEAN NOT NULL DEFAULT false;

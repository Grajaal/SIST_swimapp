/*
  Warnings:

  - You are about to drop the column `hasTeam` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "hasTeam",
ADD COLUMN     "has_team" BOOLEAN NOT NULL DEFAULT false;

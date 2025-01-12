/*
  Warnings:

  - You are about to drop the column `teamId` on the `coaches` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `swimmers` table. All the data in the column will be lost.
  - You are about to drop the column `hasTeam` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[team_id]` on the table `coaches` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `team_id` to the `coaches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "coaches" DROP CONSTRAINT "coaches_teamId_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_teamId_fkey";

-- DropForeignKey
ALTER TABLE "swimmers" DROP CONSTRAINT "swimmers_teamId_fkey";

-- DropIndex
DROP INDEX "coaches_teamId_key";

-- AlterTable
ALTER TABLE "coaches" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "swimmers" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "hasTeam",
ADD COLUMN     "has_team" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "coaches_team_id_key" ON "coaches"("team_id");

-- AddForeignKey
ALTER TABLE "coaches" ADD CONSTRAINT "coaches_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swimmers" ADD CONSTRAINT "swimmers_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

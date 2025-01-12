/*
  Warnings:

  - You are about to drop the column `swimmerId` on the `swimmers_data` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[swimmer_id,date]` on the table `swimmers_data` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `swimmer_id` to the `swimmers_data` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "swimmers_data" DROP CONSTRAINT "swimmers_data_swimmerId_fkey";

-- AlterTable
ALTER TABLE "swimmers_data" DROP COLUMN "swimmerId",
ADD COLUMN     "swimmer_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "swimmers_data_swimmer_id_date_key" ON "swimmers_data"("swimmer_id", "date");

-- AddForeignKey
ALTER TABLE "swimmers_data" ADD CONSTRAINT "swimmers_data_swimmer_id_fkey" FOREIGN KEY ("swimmer_id") REFERENCES "swimmers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

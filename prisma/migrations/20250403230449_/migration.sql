/*
  Warnings:

  - You are about to drop the column `voteCasterIds` on the `VoteCaster` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[voteCasterId]` on the table `VoteCaster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `voteCasterId` to the `VoteCaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoteCaster" DROP COLUMN "voteCasterIds",
ADD COLUMN     "voteCasterId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VoteCaster_voteCasterId_key" ON "VoteCaster"("voteCasterId");

-- AddForeignKey
ALTER TABLE "VoteCaster" ADD CONSTRAINT "VoteCaster_voteCasterId_fkey" FOREIGN KEY ("voteCasterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

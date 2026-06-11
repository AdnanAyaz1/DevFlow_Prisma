-- DropForeignKey
ALTER TABLE "VoteCaster" DROP CONSTRAINT "VoteCaster_answerId_fkey";

-- DropForeignKey
ALTER TABLE "VoteCaster" DROP CONSTRAINT "VoteCaster_questionId_fkey";

-- DropForeignKey
ALTER TABLE "VoteCaster" DROP CONSTRAINT "VoteCaster_voteCasterId_fkey";

-- DropIndex
DROP INDEX "VoteCaster_voteCasterId_key";

-- AddForeignKey
ALTER TABLE "VoteCaster" ADD CONSTRAINT "VoteCaster_voteCasterId_fkey" FOREIGN KEY ("voteCasterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteCaster" ADD CONSTRAINT "VoteCaster_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteCaster" ADD CONSTRAINT "VoteCaster_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

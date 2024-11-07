/*
  Warnings:

  - You are about to drop the column `duration` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `errorMessage` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `inputTokens` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `iterationCount` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `outputTokens` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `teamName` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `totalCost` on the `Generation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Generation_status_idx";

-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "duration",
DROP COLUMN "errorMessage",
DROP COLUMN "fileName",
DROP COLUMN "filePath",
DROP COLUMN "inputTokens",
DROP COLUMN "iterationCount",
DROP COLUMN "metadata",
DROP COLUMN "outputTokens",
DROP COLUMN "projectId",
DROP COLUMN "status",
DROP COLUMN "teamName",
DROP COLUMN "totalCost";

/*
  Warnings:

  - Added the required column `componentName` to the `Generation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentType` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "componentName" TEXT NOT NULL,
ADD COLUMN     "componentType" TEXT NOT NULL;

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'FINISHED', 'ERROR');

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "resultCode" TEXT NOT NULL,
    "notes" TEXT,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "duration" DOUBLE PRECISION,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "totalCost" DECIMAL(10,4),
    "iterationCount" INTEGER,
    "teamName" TEXT,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "userId" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Generation_userId_idx" ON "Generation"("userId");

-- CreateIndex
CREATE INDEX "Generation_status_idx" ON "Generation"("status");

-- CreateIndex
CREATE INDEX "Generation_createdAt_idx" ON "Generation"("createdAt");

-- AddForeignKey
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

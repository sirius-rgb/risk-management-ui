-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "issue_id" TEXT NOT NULL,
    "issue_title" TEXT NOT NULL,
    "issue_description" TEXT NOT NULL,
    "revised_issue_title" TEXT NOT NULL,
    "revised_issue_description" TEXT NOT NULL,
    "additional_info" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Issue_issue_id_key" ON "Issue"("issue_id");

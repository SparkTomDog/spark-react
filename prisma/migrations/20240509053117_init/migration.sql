-- CreateTable
CREATE TABLE "DataModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT,
    "type" TEXT NOT NULL DEFAULT 'folder',
    "parentId" TEXT,
    CONSTRAINT "DataModel_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DataModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DataModel_label_key" ON "DataModel"("label");

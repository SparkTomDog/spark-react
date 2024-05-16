/*
  Warnings:

  - You are about to drop the column `parentId` on the `DataModel` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `DataModel` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `DataModel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CategoryModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DataModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "DataModel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DataModel" ("content", "id", "label") SELECT "content", "id", "label" FROM "DataModel";
DROP TABLE "DataModel";
ALTER TABLE "new_DataModel" RENAME TO "DataModel";
CREATE UNIQUE INDEX "DataModel_label_key" ON "DataModel"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "CategoryModel_label_key" ON "CategoryModel"("label");

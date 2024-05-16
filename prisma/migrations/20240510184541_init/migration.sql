/*
  Warnings:

  - Added the required column `createAt` to the `CategoryModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `DataModel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT,
    "createAt" TEXT NOT NULL,
    "updateAt" TEXT,
    "deleteAt" TEXT
);
INSERT INTO "new_CategoryModel" ("content", "id", "label") SELECT "content", "id", "label" FROM "CategoryModel";
DROP TABLE "CategoryModel";
ALTER TABLE "new_CategoryModel" RENAME TO "CategoryModel";
CREATE UNIQUE INDEX "CategoryModel_label_key" ON "CategoryModel"("label");
CREATE TABLE "new_DataModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT,
    "categoryId" TEXT NOT NULL,
    "createAt" TEXT NOT NULL,
    "updateAt" TEXT,
    "deleteAt" TEXT,
    CONSTRAINT "DataModel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DataModel" ("categoryId", "content", "id", "label") SELECT "categoryId", "content", "id", "label" FROM "DataModel";
DROP TABLE "DataModel";
ALTER TABLE "new_DataModel" RENAME TO "DataModel";
CREATE UNIQUE INDEX "DataModel_label_key" ON "DataModel"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

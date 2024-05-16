/*
  Warnings:

  - You are about to drop the `CategoryModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `categoryId` on the `DataModel` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `DataModel` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CategoryModel_label_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CategoryModel";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DataModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT,
    "createAt" TEXT NOT NULL,
    "updateAt" TEXT,
    "deleteAt" TEXT
);
INSERT INTO "new_DataModel" ("content", "createAt", "deleteAt", "id", "label", "updateAt") SELECT "content", "createAt", "deleteAt", "id", "label", "updateAt" FROM "DataModel";
DROP TABLE "DataModel";
ALTER TABLE "new_DataModel" RENAME TO "DataModel";
CREATE UNIQUE INDEX "DataModel_label_key" ON "DataModel"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

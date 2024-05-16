-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "content" TEXT,
    "createAt" TEXT NOT NULL,
    "updateAt" TEXT,
    "deleteAt" TEXT,
    "type" TEXT NOT NULL DEFAULT 'folder'
);
INSERT INTO "new_CategoryModel" ("content", "createAt", "deleteAt", "id", "label", "updateAt") SELECT "content", "createAt", "deleteAt", "id", "label", "updateAt" FROM "CategoryModel";
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
    "type" TEXT NOT NULL DEFAULT 'file',
    CONSTRAINT "DataModel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DataModel" ("categoryId", "content", "createAt", "deleteAt", "id", "label", "updateAt") SELECT "categoryId", "content", "createAt", "deleteAt", "id", "label", "updateAt" FROM "DataModel";
DROP TABLE "DataModel";
ALTER TABLE "new_DataModel" RENAME TO "DataModel";
CREATE UNIQUE INDEX "DataModel_label_key" ON "DataModel"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
